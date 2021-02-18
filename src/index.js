const WebSocket = require("ws");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { router } = require("./routes");

const messages = [];

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.listen(3333, () => console.log("Server is running on port 3333."));

// Creates a new websocket server
const server = new WebSocket.Server({
  port: 8080,
});

server.on("connection", (socket) => {
  console.log("A new client has connected");

  // When a client is connected it sends all the messages stored in the session
  socket.send(JSON.stringify(messages));

  socket.on("message", (message) => {
    message = JSON.parse(message);
    messages.push(message);
    server.clients.forEach((socket) => socket.send(JSON.stringify(messages)));
  });
});
