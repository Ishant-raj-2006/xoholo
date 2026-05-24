import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effac2',
          100: '#e7f7a8',
          200: '#dcf17c',
          300: '#d0eb4f',
          400: '#c6ff00',
          500: '#a7d300',
          600: '#7fa900',
          700: '#566f00',
          800: '#354600',
          900: '#172400'
        }
      },
      boxShadow: {
        glow: '0 0 60px rgba(198,255,0,0.16)',
        soft: '0 30px 80px rgba(0,0,0,0.25)'
      },
      backgroundImage: {
        glass: 'radial-gradient(circle at top left, rgba(198,255,0,0.18), transparent 38%), radial-gradient(circle at bottom right, rgba(45,255,185,0.14), transparent 28%)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
