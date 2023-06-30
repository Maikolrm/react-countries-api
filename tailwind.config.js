/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-4xl' : '1920px'
      },
      colors: {
        'light-bg' : 'hsl(0, 0%, 98%)',
        'dark-bg' : 'hsl(207, 26%, 17%)',
        'element-dark' : 'hsl(209, 23%, 22%)',
        'dark-blue' : 'hsl(200, 15%, 8%)'
      },
      screens: {
        '4xl' : '2000px'
      }
    },
  },
  plugins: [],
}

