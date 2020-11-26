const express = require("express");
httpProxy = require("http-proxy");
fs = require("fs");

const connection = JSON.parse(fs.readFileSync("./connection.json"));
let routing = connection.services;

//Start main server (serve static files from local application folder)
const mainApp = express();
mainApp.use(express.static(__dirname + '/webapp'));
console.log("serving from directory: " + __dirname + '/webapp');
mainApp.listen(connection.serverPort);

// Start proxy server (load odata services from remote destinations)
let proxy = new httpProxy.createProxyServer({
  changeOrigin: true
    //  , target: { protocol: "https", host: "services.odata.org" }
});

//appRoute is the path on which ui5 serve is started
const appRoute = {
  target: "http://localhost:" + connection.serverPort,
};

var allowCrossDomain = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID"
  );
  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.header(200);
  } else {
    var dirname = req.url.replace(/^\/([^\/]*).*$/, "$1");
    var route = routing[dirname] || appRoute;
    //    console.log(req.method + ": " + route.target + req.url);
    proxy.web(req, res, route);
  }
};

var app = express();
app.use(allowCrossDomain);
app.listen(connection.proxyPort);
console.log("Proxy started on http://localhost:" + connection.proxyPort);
