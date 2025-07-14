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
      width: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      minWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      maxWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [require("@vueform/vueform/tailwind")],
};
