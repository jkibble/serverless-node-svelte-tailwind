# AWS Lambda (Node) + serverless framework + Svelte + Tailwind CSS + ES6 + TypeScript

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Technical considerations

**Why I'm not using SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.
  `vite dev` and `vite build` wouldn't work in a SvelteKit environment, for example.

### Project Goals

Learn as much as much can about all the technologies while playing around with new concepts

### Design considerations, subject to changes

- Accessability considerations.Aria-\* features and best practices implemented
- Keyboard accessible
- Complete dark mode colour scheme
- Svelte / Tailwind Components for anything non-trivial
- Complete i18n (i10n?) support
- Use as many high quality 3rd party libraries as appropriate
- DX is paramount therefore everything has to be as low friction and intuitive to use
- Reactive down to mobile
- Everything in a monorepo to make local development easier
- moar...

### Accessibility Guidelines

[Web Accessibility Guidelines](http://web-accessibility.carnegiemuseums.org/)

- Consistent styling through out all elements, colour (contrast), layout and accessibility
- Alt tags on images
- Links which open in a new tab links should avoided but if used should indicate they are new tabs
- Anchor tags are only used for new page navigation (GET, POST) otherwise actions are done with buttons, tabs, ajax etc
- Semantic html
- All form controls must have a label
- prefers-reduced-motion should be respected
- Dyslexia and Accessibility best practices say:
  - Make text left-aligned (not fully justified)
  - Use a sans-serif font
  - Limited use of **bold**, _italic_ <u>underlines</u>
  - Use 1.5 line spacing
  - Site does not interfere with user's ability to customize text color, size or font

### Broken Shit

- [ ] Tailwind **@apply** with things like `dark` don't work in components. Postcss needs to run first before svelte compiler
- [ ] all kinds of other things
- [ ] i18n doesn't really work
