// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/geocoder',
    createProxyMiddleware({
      target: 'https://geocoding.geo.census.gov',
      changeOrigin: true,
      pathRewrite: {
        '^/geocoder': '', // Remove /geocoder prefix when forwarding
      },
    })
  );
};
