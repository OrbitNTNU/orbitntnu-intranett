import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orbit-blue": "#1972B5",
        "orbit-yellow": "#E3A836",
      },
    },
  },
  plugins: [],
} satisfies Config;
