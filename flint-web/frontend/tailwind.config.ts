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
        background: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: '#7c3aed',
        method: {
          get: { text: '#166534', bg: '#dcfce7' },
          post: { text: '#9a3412', bg: '#ffedd5' },
          put: { text: '#1e40af', bg: '#dbeafe' },
          delete: { text: '#991b1b', bg: '#fee2e2' },
          patch: { text: '#6b21a8', bg: '#f3e8ff' },
          head: { text: '#475569', bg: '#f1f5f9' },
          options: { text: '#475569', bg: '#f1f5f9' }
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
