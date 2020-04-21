"use strict";
const http = require("http");
const jade = require("pug");
// const server = http
const auth = require("http-auth");
const basic = auth.basic(
  { realm: "Enquetes Area." },
  (username, password, callback) => {
    callback(username === "guest" && password === "xaXZJQmE");
  }
);
const server = http
  .createServer(basic, (req, res) => {
    const now = new Date();
    console.info("[" + now + "] Requested by " + req.connection.remoteAddress);

    // logout
    if (req.url === "/logout") {
      res.writeHead(401, {
        "Content-Type": "type/plain; charset=utf-8",
      });
      res.end("ログアウトしました");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.method) {
      case "GET":
        if (req.url === "/enquetes/yaki-shabu") {
          res.write(
            jade.renderFile("./form.pug", {
              path: req.url,
              firstItem: "焼き肉",
              secondItem: "しゃぶしゃぶ",
            })
          );
        } else if (req.url === "/enquetes/rice-bread") {
          res.write(
            jade.renderFile("./form.pug", {
              path: req.url,
              firstItem: "ごはん",
              secondItem: "パン",
            })
          );
        } else if (req.url === "/enquetes/sushi-pizza") {
          res.write(
            jade.renderFile("./form.pug", {
              path: req.url,
              firstItem: "寿司",
              secondItem: "ピザ",
            })
          );
        }
        res.end();
        break;
      case "POST":
        let body = [];
        req
          .on("data", (chunk) => {
            body.push(chunk);
          })
          .on("end", () => {
            body = Buffer.concat(body).toString();
            const decoded = decodeURIComponent(body);
            console.info("[" + now + "] 投稿: " + decoded);
            res.write(
              '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body><h1>' +
                decoded +
                "が投稿されました</h1></body></html>"
            );
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on("error", (e) => {
    console.error("[" + new Date() + "] Server Error", e);
  })
  .on("clientError", (e) => {
    console.error("[" + new Date() + "] Client Error", e);
  });
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info("[" + new Date() + "] Listening on " + port);
});
