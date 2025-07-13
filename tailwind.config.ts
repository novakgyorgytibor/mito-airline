module.exports = {
  content: [
    "./vueform.config.ts",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lipstick: "#C6007E",
        "navy-blue": "#06038D",
        tutu: "#FFF2FA",
      },
    },
  },
  plugins: [require("@vueform/vueform/tailwind")],
};
