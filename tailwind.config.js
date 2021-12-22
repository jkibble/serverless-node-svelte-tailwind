const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.svelte', './pages/**/*.html'],
  mode: 'jit',
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {},

        grey: colors['gray']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
