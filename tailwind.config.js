/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#06b6d4",
          dark: "#0891b2",
        },
        secondary: {
          light: "#8b5cf6",
          dark: "#7c3aed",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
