/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    minHeight: {
      0: "0",
      "1/4": "15vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100vh",
    },
    colors: {
      morado: "#635FC7",
      hmorado: "#A8A4FF",
      negro: "#000112",
      bg: "#20212C",
      oscuro: "#2B2C37",
      hoscuro: "#3E3F4E",
      gris: "#828FA3",
      hgris: "#E4EBFA",
      blanco: "#F4F7FD",
      hblanco: "#FFFFFF",
      rojo: "#EA5555",
      hrojo: "#FF9898",
    },
  },
  plugins: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
};
