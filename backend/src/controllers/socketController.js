const { Server } = require("socket.io");
const User = require("../models/userModel");
const Captain = require("../models/captainModel");

let io;

module.exports.connectToSocket = (server) => {
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

    socket.on("update-captain-location", async(data)=>{
      const {captainId, location} = data;

      if(!location || !location.ltd || !location.lng){
        return socket.emit("error", {message: "Invalid location data."})
      }

      await Captain.findByIdAndUpdate(captainId, {location:{
        ltd: location.ltd,
        lng: location.lng
      }})
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });
};

module.exports.sendMessageToSocketId = (socketId, message)=>{
  if(io){
    io.to(socketId).emit(message.event, message.data)
  } else {
    console.log("Socket is not initialized.")
  }
}


