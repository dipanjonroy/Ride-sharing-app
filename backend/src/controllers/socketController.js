const { Server } = require("socket.io");
const User = require("../models/userModel");
const Captain = require("../models/captainModel");

let io;

const connectToSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["*"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });
};

module.exports = connectToSocket;
