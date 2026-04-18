const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { processTransaction } = require("./src/engine/fraudEngine");
const { generateTransaction } = require("./src/stream/generator");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

const seenIds = new Set();

io.on("connection", () => {
  console.log("Client connected");
});

// STREAM SIMULATION
setInterval(() => {
  const tx = generateTransaction();

  const result = processTransaction(tx, seenIds);

  io.emit("update", {
    transaction: tx,
    invalid: result.invalid,
    reasons: result.reasons,
  });
}, 2000);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});