/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071633',
          900: '#0d2148',
          800: '#132c5c',
        },
        brand: {
          100: '#eaf0ff',
          500: '#3564ff',
          600: '#1747ff',
          700: '#123ad1',
        },
        purple: { 100: '#efeaff', 500: '#7655f5' },
        green: { 100: '#e3f6ed', 500: '#20a86b' },
        orange: { 100: '#fdeedd', 500: '#f28a24' },
        red: { 100: '#fceaeb', 500: '#e5484d' },
        cyan: { 100: '#e2f4f7', 500: '#159bb3' },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f7f9ff',
        },
        line: '#dfe6f4',
        ink: {
          DEFAULT: '#101d3c',
          muted: '#63708d',
        },
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '8px',
      },
      maxWidth: {
        content: '1440px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 29, 60, 0.04)',
        pop: '0 12px 32px rgba(16, 29, 60, 0.12)',
      },
    },
  },
  plugins: [],
}
