# AWS Lambda (Node) + Svelte + Vite + Tailwind CSS + ES6 + TypeScript

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Technical considerations

**Why I'm not using SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.
  `vite dev` and `vite build` wouldn't work in a SvelteKit environment, for example.

### Project Goals

Learn as much as much can about all the technologies while playing around with new concepts

### Design considerations

- Full accessability considerations. All aria-\* features and best practices implemented
- A complete dark mode colour scheme
- Svelte / Tailwind Components for anything non-trivial
- Complete i18n (i10n?) support
- Use as many high quality 3rd party libraries as appropriate
- DX is paramount therefore everything has to be as low friction and intuitive to use
- moar...
