import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import glob from "glob";
import path from "path";
import virtual from "@rollup/plugin-virtual";

let resolvers = [];

let entries = glob.sync(path.resolve("src", "pages/*.svelte")).map((file) => {
  return file
    .replace(path.join(path.resolve(), "src/pages/"), "")
    .replace(/^/, `\0`)
    .replace(".svelte", ""); // prefix with \0 so vite knows it's virtual
});

entries.forEach((file) => {
  let entry = file.replace(`\0`, "");

  let target = entry === "menu" ? "menu" : "app";

  resolvers[file] = `
    import App from '/src/pages/${entry}.svelte'

    const app = new App({
      target: document.getElementById('${target}')
    })
    
    export default app
  `;
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), virtual(resolvers)],
  build: {
    outDir: path.join("public"),
    manifest: true,
    rollupOptions: {
      input: entries,
    },
  },
});
