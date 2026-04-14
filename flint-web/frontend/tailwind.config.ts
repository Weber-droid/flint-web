/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        surface: '#161616',
        border: '#262626',
        primary: '#e5e5e5',
        secondary: '#737373',
        accent: '#7c3aed',
        method: {
          get: { text: '#22c55e', bg: '#052e16' },
          post: { text: '#f97316', bg: '#1c0a00' },
          put: { text: '#3b82f6', bg: '#0c1a2e' },
          delete: { text: '#ef4444', bg: '#1c0000' },
          patch: { text: '#a855f7', bg: '#1a0a2e' },
          head: { text: '#6b7280', bg: '#111111' },
          options: { text: '#6b7280', bg: '#111111' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        'base': '4px',
      },
      borderRadius: {
        md: '6px',
      }
    },
  },
  plugins: [],
}
