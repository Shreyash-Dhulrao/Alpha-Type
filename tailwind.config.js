/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily: {
          'Inter': ["Archivo" ],
          'Text' : ["Playfair Display"],
          'Extras' : ["Varela Round"]
        },
        backgroundImage: {
          'Background': "url('/src/assets/Images/Authentication_Image/BackgroundImage.png')",
        }
    },
  },
  plugins: [],
}

