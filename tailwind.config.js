/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },

          "33%": {
            transform: "translate(20px, -15px) scale(1.1)",
          },

          "66%": {
            transform: "translate(-20px, 25px) scale(0.9)",
          },

          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          primary: "#A37FEE",
          "primary-content": "#fff",
          secondary: "#BF7FEE",
          "secondary-content": "#fff",
        },
      },
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#A37FEE",
          "primary-content": "#fff",
          secondary: "#BF7FEE",
          "secondary-content": "#fff",
          "base-content": "#fff",
        },
      },
    ],
  },
};
