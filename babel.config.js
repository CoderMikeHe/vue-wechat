module.exports = {
  presets: ["@vue/app"],
  plugins: [
    "@babel/transform-runtime",
    "babel-plugin-transform-remove-strict-mode",
    ["component", [
      { "libraryName": "mint-ui", "style": true }
    ]]
  ],
  ignore: ["./src/assets/vendor/mui/js/mui.min.js"]
};