/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        green: {
          700: '#2f855a',
          800: '#276749',
          900: '#22543d',
        }
      }
    },
  },
  plugins: [],
}
