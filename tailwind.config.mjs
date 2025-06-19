// eslint-disable-next-line @typescript-eslint/no-var-requires
const { heroui } = require("@heroui/react")
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{mjs,js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {}
  },
  plugins: [heroui()]
}
