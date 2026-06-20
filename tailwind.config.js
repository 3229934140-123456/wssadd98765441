/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        night: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#263548',
          600: '#334155',
        },
        coral: '#FF6B6B',
        jade: '#10B981',
        amber: '#F59E0B',
        ice: '#38BDF8',
        iris: '#A78BFA',
      },
      fontFamily: {
        sans: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'card-enter': 'cardEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
