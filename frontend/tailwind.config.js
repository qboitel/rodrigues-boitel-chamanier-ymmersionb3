/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
/** @type {DefaultColors} */
// get the default colors from tailwindcss default config file
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
        ...colors,
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}

