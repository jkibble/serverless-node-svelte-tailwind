const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.svelte", "./pages/**/*.html"],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {},

        grey: colors["gray"],
        ocean: {
          100: "#0065C4",
          200: "#0075C4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
