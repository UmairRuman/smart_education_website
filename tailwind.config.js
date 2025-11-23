// ============================================================
// FILE: tailwind.config.js
// ============================================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        educational: {
          blue: '#4285f4',
          green: '#0f9d58',
          yellow: '#f4b400',
          red: '#db4437',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#374151',
            h1: {
              fontWeight: '700',
              color: '#111827',
            },
            h2: {
              fontWeight: '600',
              color: '#1f2937',
            },
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
