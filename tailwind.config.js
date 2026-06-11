module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#4A7C59', dark: '#2E5240', light: '#E8F0EB' },
        gold: { DEFAULT: '#C8973A', light: '#F5E9D4' },
        cream: '#FAF7F2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
