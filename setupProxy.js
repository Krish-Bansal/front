const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://spectacular-raindrop-556c77.netlify.app',  // Replace with the actual backend URL
      changeOrigin: true,
    })
  );
};