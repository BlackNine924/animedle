/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          dark: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          correct: '#22c55e',
          partial: '#eab308',
          incorrect: '#ef4444',
          demon: '#991b1b', // Cor característica de Demon Slayer (vermelho escuro)
        }
      },
      animation: {
        'flip-reveal': 'flipReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        flipReveal: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
