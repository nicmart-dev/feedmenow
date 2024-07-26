/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
    },
    extend: {},
  },
  plugins: [],
  purge: {
    content: ["./src/**/*.html", "./src/**/*.js"],
    safelist: ["font-thin"],
  },
};
