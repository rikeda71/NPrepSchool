"use strict";
const http = require("http");
const pug = require("pug");
const server = http
  .createServer((req, res) => {
    const now = new Date();
    console.info("[" + now + "] Requested by " + req.connection.remoteAddress);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    switch (req.method) {
      case "GET":
        if (req.url === "/enquetes/yaki-shabu") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "焼肉",
              secondItem: "しゃぶしゃぶ",
            })
          );
        } else if (req.url === "/enquetes/rice-bread") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "ご飯",
              secondItem: "パン",
            })
          );
        } else if (req.url === "/enquetes/sushi-pizza") {
          res.write(
            pug.renderFile("./form.pug", {
              path: req.url,
              firstItem: "寿司",
              secondItem: "ピザ",
            })
          );
        }
        res.end();
        break;
      case "POST":
        let rawData = "";
        req
          .on("data", (chunk) => {
            rawData = rawData + chunk;
          })
          .on("end", () => {
            const qs = require("querystring");
            const decoded = decodeURIComponent(rawData);
            console.info("[" + now + "] 投稿: " + decoded);
            const answer = qs.parse(decoded);
            res.write(
              '<!DOCTYPE html><html lang="ja"><body><h1>' +
                answer["name"] +
                "さんは" +
                answer["favorite"] +
                "に投票しました</h1></body></html>"
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
const port = 8000;
server.listen(port, () => {
  console.info("[" + new Date() + "] Listening on " + port);
});