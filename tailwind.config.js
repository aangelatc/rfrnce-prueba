export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rfrnce: {
          white: "#ffffff",
          black: "#201f21",
          lime: "#89f336",
          gray: "#606060",
          offwhite: "#f6f5f2",
        },
      },
      fontFamily: {
        newsreader: ["'Newsreader'", "serif"],
        archivo: ["'Archivo'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(32,31,33,0.04)",
      },
    },
  },
  plugins: [],
}
