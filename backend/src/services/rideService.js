const Ride = require("../models/rideModel");
const ExpressError = require("../utility/expresserror");
const { getDistance } = require("./MapServices");

module.exports.getFare = async (destination, pickup) => {
  if (!pickup || !destination) {
    throw new ExpressError(401, "Pick and destination are required.");
  }

  const distanceTime = await getDistance(destination, pickup);

  const baseFare = {
    auto: 50,
    car: 80,
    bike: 30,
  };

  const perKmRate = {
    auto: 20,
    car: 30,
    bike: 10,
  };

  const perMinRate = {
    auto: 3,
    car: 5,
    bike: 2,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinRate.car
    ),
    bike: Math.round(
      baseFare.bike +
        (distanceTime.distance.value / 1000) * perKmRate.bike +
        (distanceTime.duration.value / 60) * perMinRate.bike
    ),
  };

  return fare;
};

const getOtp = (num) => {
  return Math.floor(Math.random() * Math.pow(10, num));
};

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new ExpressError(401, "All fields are required.");
  }

  const fare = await getFare(destination, pickup);

  const ride = Ride.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOtp(6),
  });

  return ride;
};
