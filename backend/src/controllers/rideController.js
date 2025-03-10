const { createRide } = require("../services/rideService");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  const userId = req.user;

  const ride = await createRide(userId, pickup, destination, vehicleType);

  res.json({
    success: true,
    ride,
  });
};
