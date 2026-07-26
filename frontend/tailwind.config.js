/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF85C2',
          DEFAULT: '#FF69B4', // Pink
          dark: '#E04D95'
        },
        secondary: {
          light: '#FFE24D',
          DEFAULT: '#FFD700', // Golden Yellow
          dark: '#E6C200'
        },
        accent: {
          light: '#A0522D',
          DEFAULT: '#8B4513', // Chocolate Brown
          dark: '#6E320A'
        },
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FFF8F0', // Background
          dark: '#EBE2D5'
        },
        darkBg: {
          light: '#2D2D2D',
          DEFAULT: '#1E1E1E', // Dark Mode Base
          dark: '#121212'
        },
        darkCard: '#2A2A2A',
        textColor: {
          light: '#333333',
          dark: '#E5E7EB'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
