/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#14b8a6',
        'brand-teal-dark': '#0f766e',
        'brand-orange': '#f97316',
        'brand-orange-dark': '#c2410c',
        'brand-primary': '#0d9488',
        'brand-secondary': '#f59e0b',
        'brand-dark': '#0f172a',
        'brand-light': '#f1f5f9',
        'slatewhite': '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}