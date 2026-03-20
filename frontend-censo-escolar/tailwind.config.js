/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Mantendo a cor customizada para o projeto
      colors: {
        'dataviva-blue': '#003366',
      },
    },
  },
  plugins: [],
}