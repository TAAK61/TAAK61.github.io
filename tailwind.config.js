/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette de couleurs Liquid Glass
      colors: {
        glass: {
          light: '#F5F5F7',
          dark: '#000000',
          blur: 'rgba(255, 255, 255, 0.15)',
          'blur-light': 'rgba(255, 255, 255, 0.3)',
          'blur-dark': 'rgba(0, 0, 0, 0.15)',
          border: 'rgba(255, 255, 255, 0.2)',
          'border-dark': 'rgba(255, 255, 255, 0.1)',
          highlight: 'rgba(255, 255, 255, 0.5)',
          shadow: 'rgba(0, 0, 0, 0.1)',
        },
        accent: {
          blue: '#007AFF',
          orange: '#FF9F00',
          gold: '#FFD700',
          green: '#32CD32',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
        crypto: {
          bitcoin: '#F7931A',
          ethereum: '#627EEA',
          cardano: '#0033AD',
          solana: '#9945FF',
        }
      },

      // Typographie système
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
      },

      // Tailles responsives
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '1.1' }],
        'title': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.2' }],
        'subtitle': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.4' }],
      },

      // Espacement fluide
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // Animations personnalisées
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
        'morph': 'morph 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },

      // Keyframes pour les animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glass-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        morph: {
          '0%': { borderRadius: '2rem' },
          '100%': { borderRadius: '0.5rem' },
        },
      },

      // Dégradés pour effets visuels
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'crystal-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.0) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      },

      // Ombres pour profondeur
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.15)',
        'glass-xl': '0 24px 96px rgba(0, 0, 0, 0.18)',
        'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'crystal': '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [
    // Plugin pour les utilitaires Liquid Glass
    function({ addUtilities, addComponents }) {
      const newUtilities = {
        '.glass-morphism': {
          'backdrop-filter': 'blur(8px) saturate(180%)',
          'background-color': 'rgba(255, 255, 255, 0.15)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '12px',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
        '.glass-card': {
          'backdrop-filter': 'blur(12px) saturate(180%)',
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
          'border-radius': '16px',
          'box-shadow': '0 16px 64px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
        '.glass-button': {
          'backdrop-filter': 'blur(8px)',
          'background-color': 'rgba(255, 255, 255, 0.2)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
          'border-radius': '8px',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background-color': 'rgba(255, 255, 255, 0.3)',
            'transform': 'translateY(-2px)',
            'box-shadow': '0 12px 48px rgba(0, 0, 0, 0.15)',
          },
        },
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #007AFF 0%, #FF9F00 100%)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      const newComponents = {
        '.glass-container': {
          'position': 'relative',
          'backdrop-filter': 'blur(12px) saturate(180%)',
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '16px',
          'box-shadow': '0 16px 64px rgba(0, 0, 0, 0.1)',
          'overflow': 'hidden',
        },
      };

      addUtilities(newUtilities);
      addComponents(newComponents);
    },
  ],
}
