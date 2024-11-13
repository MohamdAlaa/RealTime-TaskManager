// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow CORS requests from your frontend

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Handle WebSocket connections and task events
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Listen for task events from clients and broadcast to all other clients
  socket.on("addTask", (task) => {
    io.emit("taskAdded", task); // Broadcast the new task to all connected clients
  });

  socket.on("updateTask", (updatedTask) => {
    io.emit("taskUpdated", updatedTask); // Broadcast the updated task to all clients
  });

  socket.on("deleteTask", (taskId) => {
    io.emit("taskDeleted", taskId); // Broadcast the deleted task ID to all clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
