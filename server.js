const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const generateTransaction = require("./src/stream/generator");
const { processTransaction } = require("./src/engine/fraudEngine");

// GLOBAL STATE
const seenIds = new Set();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

io.on("connection", () => {
  console.log("Client connected");
});

setInterval(() => {
  const tx = generateTransaction();
  const result = processTransaction(tx, seenIds);

  io.emit("update", {
    transaction: tx,
    invalid: result.invalid,
    reasons: result.reasons || []
  });

}, 2000);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});