const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      // target: "http://192.168.10.100:8093/", // 32사단
      // target: "http://192.168.219.204:8093/", // external
      target: "http://112.145.7.170:48093/", // external
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    createProxyMiddleware("/dbapi", {
      // target: "http://192.168.10.100:8093/", // 32사단
      // target: "http://192.168.219.204:8093/", // external
      target: "http://112.145.7.170:48093/", // external
      changeOrigin: true,
      secure: false,
    })
  );
};
