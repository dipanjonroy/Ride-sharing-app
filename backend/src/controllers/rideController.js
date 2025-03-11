const { response } = require("express");
const { createRide, getFare } = require("../services/rideService");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  const userId = req.user;

  const ride = await createRide(userId, pickup, destination, vehicleType);

  res.json({
    success: true,
    ride,
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
