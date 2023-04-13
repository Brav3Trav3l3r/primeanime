/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily:{
        lato:['Lato', 'sans-serif'],
        roboto:['Roboto', 'sans-serif'],
        lexend:['Lexend', 'sans-serif'],
        poppins:['Poppins', 'sans-serif'],
      },
    }
  },
  daisyui:{
    themes:['forest']
  },
  plugins: [require("daisyui"),
  require('@tailwindcss/line-clamp')]
};