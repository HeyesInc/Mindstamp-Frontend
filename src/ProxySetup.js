// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://back-end:8080", // Replace with your target URL
//       changeOrigin: true,
//       onProxyReq(proxyReq, req, res) {
//         // Allow other request methods (PUT, POST, DELETE, etc.)
//         if (req.method !== "GET") {
//           proxyReq.setHeader("Content-Type", "application/json");
//           proxyReq.setHeader("Accept", "application/json");
//         }
//       },
//     })
//   );
// };
