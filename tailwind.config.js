/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    screens:{
      'galaxy': {'max': '280px'},
      ...defaultTheme.screens,
    },
    fontFamily: {
        '3d': ['"3d"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}