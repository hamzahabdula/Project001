/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EFF5',
          100: '#CCDFEB',
          200: '#99BFD7',
          300: '#669FC3',
          400: '#337FAF',
          500: '#0F4C81', // main
          600: '#0C3D67',
          700: '#092E4E',
          800: '#061E34',
          900: '#030F1A',
        },
        secondary: {
          50: '#E8F4F5',
          100: '#D1E9EB',
          200: '#A3D3D7',
          300: '#75BDC3',
          400: '#47A7AF',
          500: '#1A7B87', // main
          600: '#15626C',
          700: '#104A51',
          800: '#0A3136',
          900: '#05181B',
        },
        accent: {
          50: '#FEF0E6',
          100: '#FCE2CC',
          200: '#F9C499',
          300: '#F7A766',
          400: '#F48933',
          500: '#F26419', // main
          600: '#C25014',
          700: '#913C0F',
          800: '#61280A',
          900: '#301405',
        },
        success: {
          50: '#E6F7EF',
          100: '#CCEFDF',
          200: '#99DFBF',
          300: '#66CF9F',
          400: '#33BF7F',
          500: '#00AF5F',
          600: '#008C4C',
          700: '#006939',
          800: '#004626',
          900: '#002313',
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE399',
          300: '#FFD566',
          400: '#FFC733',
          500: '#FFB900',
          600: '#CC9400',
          700: '#996F00',
          800: '#664A00',
          900: '#332500',
        },
        error: {
          50: '#FCE6E6',
          100: '#F9CCCC',
          200: '#F39999',
          300: '#ED6666',
          400: '#E73333',
          500: '#E10000',
          600: '#B40000',
          700: '#870000',
          800: '#5A0000',
          900: '#2D0000',
        },
      },
      fontFamily: {
        sans: [
          'Inter', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        heading: [
          'SF Pro Display', 
          'Inter', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};