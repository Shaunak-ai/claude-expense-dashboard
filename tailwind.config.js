/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        claude: {
          orange: '#da7756',
          tan: '#d4a27f',
          cream: '#e8dcc4',
          beige: '#f5f0e6',
        }
      }
    },
  },
  plugins: [],
}
