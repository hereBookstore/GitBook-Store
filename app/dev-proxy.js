const proxy = require("http-proxy").createProxyServer();
require("http")
  .createServer(function(req, res) {
    /^\/gitbook\//.test(req.url)
      ? proxy.web(req, res, { target: "http://localhost:3000" })
      : proxy.web(req, res, { target: "http://localhost:10086" });
  })
  .listen(9000, () => console.log("HTTP proxy running on", 9000));
proxy.on("error", console.error);
