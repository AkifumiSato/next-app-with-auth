/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef -- tailwindcss config
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
