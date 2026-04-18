const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// port configuration
const PORT = process.env.PORT || 3000;

// serve frontend
app.use(express.static("public"));

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected");
});

// start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});