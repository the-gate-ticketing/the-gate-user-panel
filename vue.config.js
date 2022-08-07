process.env.VUE_APP_VERSION = require("./package.json").version;
module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production"
  }
};
