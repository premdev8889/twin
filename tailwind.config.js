/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", "system-ui", "sans-serif"], // ✅ Default font
      },
    },
  },
  plugins: [],
}


