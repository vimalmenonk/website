/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0B0F',
      },
      boxShadow: {
        neon: '0 0 18px rgba(59, 130, 246, 0.5), 0 0 26px rgba(147, 51, 234, 0.35)',
      },
      backgroundImage: {
        neon: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      },
    },
  },
  plugins: [],
};
