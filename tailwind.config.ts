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
        // Dark canvas. `cream` is the surface family: DEFAULT is the page
        // background (near-black), higher shades are progressively lighter
        // raised surfaces (cards, hovers).
        cream: {
          DEFAULT: "#101012",
          50: "#191A1D",
          100: "#101012",
          200: "#24252A",
        },
        // Light "ink" — the content family. DEFAULT is primary text (near-white);
        // higher numbers are progressively more muted greys / hairline borders.
        ink: {
          DEFAULT: "#F6F2EA",
          800: "#E7E2D6",
          700: "#D3CDBF",
          600: "#B7B0A0",
          500: "#948C7C",
          400: "#6F6858",
        },
        // Pilk's signature colour — the app's violet, matching the product.
        pilk: {
          50: "#F3EEFE",
          100: "#E4D9FD",
          200: "#CDB8FA",
          300: "#B195F8",
          400: "#9A75F7",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        // Teal — the money colour (secured / settled / positive states),
        // mirroring the app (60-30-10: dark neutral / violet / teal).
        teal: {
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
        },
        // Warm amber, analogous to orange — one soft accent inside the mockup.
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
