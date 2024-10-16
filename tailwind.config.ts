import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#001347e2",
          100: "#fdfdfe",
          200: "#f7f9ff",
          300: "#edf2fe",
          400: "#dfeaff",
          500: "#d0dfff",
          600: "#bdd1ff",
          700: "#a6bff9",
          800: "#87a5ef",
          900: "#3d63dd",
          1000: "#3657c3",
          1001: "#395bc7",
          1002: "#1d2e5c",
          a1: "#00008002",
          a2: "#0040ff08",
          a3: "#0047f112",
          a4: " #0058ff20",
          a5: "#0052ff2f",
          a6: "#004eff42",
          a7: "#0048ee59",
          a8: " #0040dd78",
          a9: " #0032d2c2",
          a10: "#002ab3c9",
          a11: "#002cb7c6",
          a12: "#001347e2",
        },
        grey: {
          1: "#fcfcfd",
          2: "#f9f9fb",
          3: "#eff0f3",
          4: "#e7e8ec",
          5: "#e0e1e6",
          6: "#d8d9e0",
          7: "#cdced7",
          8: "#b9bbc6",
          9: "#8b8d98",
          10: "#80828d",
          11: "#62636c",
          12: "#1e1f24",
          a1: "#00005503",
          a2: "#00005506",
          a3: "#00104010",
          a4: "#000b3618",
          a5: "#0009321f",
          a6: "#00073527",
          a7: "#00063332",
          a8: "#00083046",
          a9: "#00051d74",
          a10: " #00051b7f",
          a11: " #0002119d",
          a12: " #000107e1",
          surface: " #ffffffcc",
          600: "#96a6b7",
        },
        warning: {
          DEFAULT: "#ced613",
        },
        error: {
          DEFAULT: "#d6132a",
        },
        success: {
          DEFAULT: "#00dd66",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "boost-career-pattern": "url('/assets/images/shape-bg.png')",
      },
      animation: {
        "gradient-bg": "gradient 5s ease infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%", // To enable the sliding effect
      },
    },
  },
  plugins: [],
};
export default config;
