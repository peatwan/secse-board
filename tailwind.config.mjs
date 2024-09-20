// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {}
  },
  plugins: [nextui()]
}
