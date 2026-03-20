/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aqui você pode personalizar cores para o projeto
      colors: {
        'dataviva-blue': '#003366', // Exemplo de cor customizada
      },
    },
  },
  plugins: [],
}