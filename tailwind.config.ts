import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Quantum Batteries brand palette — QB 2026
        quantum: {
          navy: "#00205B", // primary
          "navy-deep": "#00000F",
          "navy-darker": "#000022",
          "navy-dark": "#000E48",
          "navy-mid": "#163269",
          "navy-light": "#4968A2",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "aurora-mesh":
          "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(0,32,91,0.10), transparent), radial-gradient(ellipse 60% 50% at 80% 0%, rgba(73,104,162,0.14), transparent), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(22,50,105,0.08), transparent)",
        "grid-pattern":
          "linear-gradient(to right, rgba(0,32,91,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,32,91,0.055) 1px, transparent 1px)",
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(40px)" },
          "50%": { opacity: "1", filter: "blur(60px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 32s linear infinite",
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
