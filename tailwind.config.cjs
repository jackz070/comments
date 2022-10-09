/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midblue: "hsl(238, 40%, 52%)",
        softred: "hsl(358, 79%, 66%)",
        grayishblue: "hsl(239, 57%, 85%)",
        palered: "hsl(357, 100%, 86%)",
        darkblue: "hsl(212, 24%, 26%)",
        grayishblue: "hsl(211, 10%, 45%)",
        lightgray: "hsl(223, 19%, 93%)",
        verylightgrey: "hsl(228, 33%, 97%)",
        white: "hsl(0, 0%, 100%)",
      },
    },
    colors: {},
    fontFamily: { sans: "Rubik" },
  },
  plugins: [],
};
