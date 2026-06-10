/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        ink: {
          950: '#01080A',
          900: '#061113',
          850: '#0A1818',
          800: '#102120',
          700: '#1B302F',
        },
        brand: {
          700: '#005030',
          600: '#0B5A35',
          500: '#106030',
          400: '#168846',
          300: '#60E89D',
          200: '#9AF6C0',
        },
        sage: {
          300: '#B0C0B0',
          200: '#C8D6CB',
          100: '#EAF1EC',
        },
        surface: {
          default: '#FFFFFF',
          muted: '#F6F8F5',
          dark: '#01080A',
          raised: '#061113',
        },
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 8.4vw, 8rem)', { lineHeight: '0.9', fontWeight: '700' }],
        'display-lg': ['clamp(2.65rem, 5.6vw, 5.9rem)', { lineHeight: '0.95', fontWeight: '650' }],
        'display-md': ['clamp(2.05rem, 3.4vw, 3.9rem)', { lineHeight: '1.02', fontWeight: '650' }],
        heading: ['clamp(1.55rem, 2.2vw, 2.5rem)', { lineHeight: '1.08', fontWeight: '650' }],
        lead: ['clamp(1.05rem, 1.35vw, 1.28rem)', { lineHeight: '1.65', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.7', fontWeight: '450' }],
        eyebrow: ['0.74rem', { lineHeight: '1.35', fontWeight: '700', letterSpacing: '0' }],
        caption: ['0.82rem', { lineHeight: '1.55', fontWeight: '600' }],
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        video: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        soft: "0 18px 45px rgba(1, 8, 10, 0.08)",
        elevated: "0 28px 70px rgba(1, 8, 10, 0.14)",
        cinematic: "0 46px 120px rgba(1, 8, 10, 0.36)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
