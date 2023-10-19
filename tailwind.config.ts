import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        primaryColor: "#171026",
        secondaryColorOne: "#586F7C",
        secondaryColorTwo: "#271F38",
        accentColorOne: "#B8DBD9",
        accentColorTwo: "#EAB308",
      },
=======
        primaryColor: '#171026',
        secondaryColorOne: '#586F7C',
        secondaryColorTwo: '#271F38',
        accentColorOne: '#B8DBD9',
        accentColorTwo: '#EAB308',
        subtext: '#9CA3AF'
      }
>>>>>>> a235cc8afe6d5f7545291c8c672849166d6b076e
    },
  },
  plugins: [],
} satisfies Config;
