import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        figma: {
          ink: "#0d0d0d",          // Background Primary
          dark: "#0a0a0a",         // Surface Deep
          card: "rgba(255, 255, 255, 0.07)",
          cardHover: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.10)",
          purple: "#A855F7",       // Figma Glow Accent
          purpleLight: "#C084FC",
          textMuted: "#A1A1AA",
          textLight: "#F4F4F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        purpleGlow: "0 0 35px -5px rgba(168, 85, 247, 0.35)",
        purpleGlowHeavy: "0 0 60px -5px rgba(168, 85, 247, 0.5)",
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
