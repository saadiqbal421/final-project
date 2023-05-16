/* This is the code for the server.js file. 
The code that is run when the server is started on the client side. */

const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
    }
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(3001, (err) => {
      if (err) {
        throw err;
      }
      console.log("ready on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
