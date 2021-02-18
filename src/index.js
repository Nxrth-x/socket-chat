const WebSocket = require("ws");
const path = require("path");
const http = require("http");
const fs = require("fs");

// HTTP server to send static files
http
  .createServer((request, response) => {
    fs.readFile(path.join(__dirname, "static", request.url), (error, data) => {
      if (error) {
        fs.readFile(path.join(__dirname, "static", "404.html"), (_, data) => {
          response.writeHead(404);
          response.end(data);
        });
      } else {
        response.writeHead(200);
        response.end(data);
      }
    });
  })
  .listen(8000);

// Creates a new websocket server
const server = new WebSocket.Server({
  port: 8080,
});

const messages = [];

server.on("connection", (socket) => {
  console.log("A new client has connected");

  // When a client is connected it sends all the messages stored in the session
  socket.send(JSON.stringify(messages));

  socket.on("message", (message) => {
    messages.push(message);
    server.clients.forEach((socket) => socket.send(JSON.stringify(messages)));
  });
});
