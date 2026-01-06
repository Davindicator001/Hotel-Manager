/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* primary: '#22c55e', // Green
        secondary: '#10b981', // Lighter green
        accent: '#3b82f6', // Blue accent
        dark: '#1e293b', // Dark gray
        light: '#f8fafc', // Light gray */
        primary: '#0F2A44',
        secondary: '#C9A24D',
        background: '#F9FAFB',
        accent: '#1F2933'
//Muted Text / Borders: Cool Gray — #D1D5DB
      },
    },
  },
  plugins: [],
}
