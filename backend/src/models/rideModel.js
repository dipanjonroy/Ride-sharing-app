const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },

  pickup: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
  },
  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },

  duration: {
    type: Number,
  },

  distance: {
    type: Number,
  },

  paymentID: {
    type: String,
  },

  orderID: {
    type: String,
  },

  signature: {
    type: String,
  },

  otp: {
    type: String,
    select: false,
  },
});

const Ride = model("Ride", rideSchema);

module.exports = Ride;
