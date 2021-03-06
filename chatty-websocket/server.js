// server.js

const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;
const uuid4 = require("uuid/v4");
const escapehtml = require("escape-html");
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

// Generalized function to broadcast some data to all connected clients
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
  // Set random color by client connection
  let rand = Math.floor(Math.random() * 9);
  const color = colors[rand];
  console.log("Client connected");
  let data = {
    numberUsers: n,
    type: "newUser",
    color: null
  };
  // Broadcast to everyone else.
  broadcastToClients(wss, data);

  // Handle incoming data from client
  ws.on("message", function incoming(data) {
    let u = JSON.parse(data);
    switch (JSON.parse(data).type) {
      // Handle the case when new message comes in from one client
      case "postMessage":
        u.id = uuid4();
        u.content = escapehtml(u.content);
        console.log(data);
        u.type = "incomingMessage";
        u.color = color;
        break;
      case "postNotification":
        u.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
    // Broadcast to everyone else.
    broadcastToClients(wss, u);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    // Decrease the number of connected clients
    n -= 1;
    let data = {
      numberUsers: n,
      type: "newUser"
    };
    // Broadcast to everyone else.
    broadcastToClients(wss, data);
    console.log("Client disconnected");
  });
});
