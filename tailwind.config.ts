import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exercism-inspired palette
        "enkire-dark":    "#1b1b2e",   // header bg
        "enkire-darker":  "#14141f",
        "enkire-purple":  "#6200ee",   // primary accent
        "enkire-violet":  "#7c3aed",
        "enkire-light-purple": "#ede7f6",
        "enkire-bg":      "#f5f6fb",   // page background
        "enkire-surface": "#ffffff",
        "enkire-border":  "#e0e0e0",
        "enkire-text":    "#2d2d2d",
        "enkire-muted":   "#6b7280",
        "enkire-success": "#00c65e",
        "enkire-gold":    "#f5a623",
        // Reputation/badge colors
        "rep-gold": "#ffd700",
        "badge-common":    "#9ca3af",
        "badge-rare":      "#3b82f6",
        "badge-epic":      "#8b5cf6",
        "badge-legendary": "#f59e0b",
        "badge-ultimate":  "#ef4444",
      },
      fontFamily: {
        sans: ["Poppins", "PoppinsInitial", "sans-serif"],
        mono: ["Source Code Pro", "monospace"],
      },
      boxShadow: {
        "card":    "0 2px 8px rgba(0,0,0,0.08)",
        "card-lg": "0 4px 24px rgba(0,0,0,0.12)",
        "header":  "0 1px 0 rgba(255,255,255,0.1)",
        "dropdown":"0 8px 32px rgba(0,0,0,0.16)",
      },
      borderRadius: {
        "xl2": "1rem",
        "xl3": "1.5rem",
      },
      animation: {
        "fade-up":   "fadeUp 0.4s ease-out forwards",
        "fade-in":   "fadeIn 0.3s ease-out forwards",
        "badge-pop": "badgePop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        "progress":  "progressFill 0.8s ease-out forwards",
        "rep-count": "repCount 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity:"0", transform:"translateY(12px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        fadeIn:  { "0%": { opacity:"0" }, "100%": { opacity:"1" } },
        badgePop:{ "0%": { transform:"scale(0.5)", opacity:"0" }, "70%": { transform:"scale(1.1)" }, "100%": { transform:"scale(1)", opacity:"1" } },
        progressFill: { "0%": { width:"0%" }, "100%": { width:"var(--progress-w)" } },
        repCount:{ "0%": { transform:"scale(1.2)", color:"#f5a623" }, "100%": { transform:"scale(1)" } },
      },
    },
  },
  plugins: [],
};

export default config;
