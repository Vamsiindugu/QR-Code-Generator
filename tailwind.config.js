/** @type {import('tailwindcss').Config} */
module.exports = {
  // FIX: Enables dark mode based on the presence of the 'dark' class on the html element
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom fonts for a modern look
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}