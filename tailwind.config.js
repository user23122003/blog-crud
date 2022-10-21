/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DC071",
        secondary: "#6F49FD",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
        "icon-color": "#A2A2A8",
        white: "#FFFFFF",
        whiteSoft: "#FCFBFF",
        graySoft: "#FCFCFC",
        strock: "#F1F1F3",
        lite: "#FCFCFD",
        error: "#EB5757",
        darkbg: "#13131A",
        darkSecondary: "#1C1C24",
        softDark: "#22222C",
        darkSoft: "#24242C",
        darkStroke: "#3A3A43",
        darkRed: "#422C32",
        textGreen: "#22C38F",
        textPurPle: "#A288EC",
        textOrgan: "#FEA73E",
        textBlue: "#009EF7",
      },
      screens: {
        sm: "330px",
        // => @media (min-width: 576px) { ... }

        md: "820px",
        // => @media (min-width: 960px) { ... }

        lg: "1440px",
        // => @media (min-width: 1440px) { ... }
      },
    },
    colors: {
      "text-color": "var(--text-color)",
      "text-gray": "var(--text-gray)",
      "text-blue": "var(--text-blue)",
      "bg-primary": "var(--bg-primary)",
      "bg-secondary": "var(--bg-secondary)",
      "bg-dark": "var(--bg-dark)",
      "bg-green": "var(--bg-green)",
      "bg-red": "var(--bg-red)",
      "bg-blue": "var(--bg-blue)",
      "bg-organ": "var(--bg-organ)",
    },
  },
  plugins: [],
};
