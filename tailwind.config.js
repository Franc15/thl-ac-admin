const webpack = require("webpack");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [
    {
      resolve: "gatsby-plugin-react-pdf",
    },
  ],
};
