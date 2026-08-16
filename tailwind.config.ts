import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white canvas — feels friendly, not clinical.
        cream: {
          DEFAULT: "#FBF7EF",
          50: "#FEFDFB",
          100: "#FBF7EF",
          200: "#F4ECDD",
        },
        // Near-black with a touch of warmth for text and dark surfaces.
        ink: {
          DEFAULT: "#17150F",
          800: "#26231A",
          700: "#3A362A",
          600: "#57513F",
          500: "#756E58",
          400: "#9A927A",
        },
        // Pilk's signature green — fresh, appetizing, trustworthy.
        pilk: {
          50: "#E9FBF2",
          100: "#CBF5E0",
          200: "#98EBC3",
          300: "#5CDCA1",
          400: "#2AC582",
          500: "#12B27A",
          600: "#0B8F63",
          700: "#0C7150",
          800: "#0E5A42",
          900: "#0C4635",
        },
        // Warm accent used sparingly inside product mockups (receipts, chips).
        melon: {
          400: "#FF8A6B",
          500: "#FF6F4D",
        },
        butter: {
          400: "#FFD466",
          500: "#F7C13B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(23,21,15,0.04), 0 8px 24px rgba(23,21,15,0.06)",
        lift: "0 2px 4px rgba(23,21,15,0.05), 0 18px 48px rgba(23,21,15,0.12)",
        phone: "0 8px 24px rgba(23,21,15,0.10), 0 40px 80px rgba(23,21,15,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.5s ease both",
        "scan-line": "scan-line 2.4s ease-in-out infinite",
        "pop-in": "pop-in 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
