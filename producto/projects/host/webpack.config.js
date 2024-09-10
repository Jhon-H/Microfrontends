const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    "mf-home": "http://localhost:4201/remoteEntry.js",
    "mf-cart": "http://localhost:4202/remoteEntry.js",
    "mf-product-detail": "http://localhost:4203/remoteEntry.js",
    "mf-product-list": "http://localhost:4204/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
