/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          dark: {
            0: "#000000",
            10: "#111111",
            20: "#232323",
            30: "#313131",
            40: "#3d3d3d",
            50: "#494949",
            60: "#565656",
            70: "#646464",
            80: "#737373",
            90: "#868686",
            100: "#989898",
            200: "#a6a6a6",
            300: "#b2b2b2",
            400: "#c0c0c0",
            500: "#cbcbcb",
            600: "#d5d5d5",
            700: "#e1e1e1",
            800: "#ececec",
            900: "#fafafa",
          }
        }
    },
  },
  plugins: [],
}