// server.js

const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuid4 = require("uuid/v4");
const colors = [
  "#00FF00",
  "#D2691E",
  "#FF0000",
  "#FF1493",
  "#00FFFF",
  "#BDB76B",
  "#FF00FF",
  "#00BFFF",
  "#FFFF33"
];
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });
let n = 0;
function broadcastToClients(wss, data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  n += 1;
  let rand = Math.floor(Math.random() * 9);
  console.log(rand);
  console.log("Client connected");
  let data = {
    numberUsers: n,
    type: "newUser",
    color: colors[rand]
  };
  broadcastToClients(wss, data);

  ws.on("open", () => {
    console.log("Connection Opened!");
  });
  ws.on("message", function incoming(data) {
    // Broadcast to everyone else.
    let u = JSON.parse(data);
    switch (JSON.parse(data).type) {
      case "postMessage":
        u.id = uuid4();
        u.type = "incomingMessage";
        break;
      case "postNotification":
        u.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
    broadcastToClients(wss, u);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    n -= 1;
    let data = {
      numberUsers: n,
      type: "newUser"
    };
    broadcastToClients(wss, data);
    console.log("Client disconnected");
  });
});
