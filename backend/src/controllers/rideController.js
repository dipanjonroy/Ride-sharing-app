const { createRide, acceptRideService } = require("../services/rideService");

const getFare = require("../services/rideService");
const {
  getAddressCoordinate,
  getCaptainInRadius,
} = require("../services/MapServices");
const { sendMessageToSocketId } = require("./socketController");
const Ride = require("../models/rideModel");
const { findById } = require("../models/captainModel");
const Captain = require("../models/captainModel");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  const userId = req.user;

  const ride = await createRide(userId, pickup, destination, vehicleType);

  res.json({
    success: true,
    ride,
  });

  const pickupCoordinate = await getAddressCoordinate(pickup);

  const getNearByCaptains = await getCaptainInRadius(
    pickupCoordinate.ltd,
    pickupCoordinate.lng,
    2,
    vehicleType
  );

  ride.otp = "";

  const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");

  getNearByCaptains.map((captains) => {
    sendMessageToSocketId(captains.socketId, {
      event: "new-ride",
      data: rideWithUser,
    });
  });
};

module.exports.getFare = async (req, res) => {
  const { destination, pickup } = req.query;

  const fare = await getFare(destination, pickup);

  res.json({
    success: true,
    fare,
  });
};

module.exports.acceptRide = async (req, res) => {
  const { rideId } = req.body;

  const captain = await Captain.findById(req.captain);

  const ride = await acceptRideService({ rideId, captain });

  res.json({
    ride,
  });

  console.log("User SocketId: ", ride.user.socketId);

  sendMessageToSocketId(ride.user.socketId, {
    event: "accept-ride",
    data: ride,
  });
};

module.exports.confirmRide = async (req, res) => {
  const { rideId, otp } = req.query;

  const confirmedRide = await getFare.confirmRideService({
    rideId,
    otp,
    captainId: req.captain,
  });

  sendMessageToSocketId(confirmedRide?.user.socketId, {
    event: "confirm-ride",
    data: confirmedRide,
  });

  res.json({
    confirmedRide,
  });
};
