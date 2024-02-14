import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: '#171026',
        secondaryColorOne: '#586F7C',
        secondaryColorTwo: '#271F38',
        accentColorOne: '#B8DBD9',
        accentColorTwo: '#EAB308',
        subtext: '#D7D4D3'
      }
    },
  },
  plugins: [],
} satisfies Config;
