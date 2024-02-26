/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#6a12e9',
        'yellow': '#FFCC00',
        'teal': '#21FFE1',
      },
      fontFamily: {
        'heading': ['Haymaker', 'sans-serif'],
        'body': ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

