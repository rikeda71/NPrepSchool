"use strict";

function handleLogout(req, res) {
  res.writeHead(401, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("ログアウトしました");
}

function handleBadRequest(req, res) {
  res.writeHead(403, {
    "Content-Type": "text/plain; charset=utf-8".
  })
  res.end("未対応のメソッドです")
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("ページが見つかりません");
}


module.exports = {
  handleLogout,
  handleBadRequest,
  handleNotFound,
};