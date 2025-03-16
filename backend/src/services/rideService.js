const Captain = require("../models/captainModel");
const Ride = require("../models/rideModel");
const ExpressError = require("../utility/expresserror");
const { getDistance } = require("./MapServices");

const getFare = async (destination, pickup) => {
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

module.exports = getFare;

const getOtp = (num) => {
  return Math.floor(Math.random() * Math.pow(10, num));
};

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new ExpressError(401, "All fields are required.");
  }

  const fare = await getFare(destination, pickup);

  const ride = await Ride.create({
    user,
    pickup,
    vehicleType,
    destination,
    fare: fare[vehicleType],
    
  });

  return ride;
};

module.exports.acceptRideService = async(data)=>{

  const {rideId, captain} = data;

 await Ride.findByIdAndUpdate(rideId, {
    status: "accepted",
    captain: captain._id,
    otp: getOtp(6),
  })

  const ride = await Ride.findById(rideId).populate("user").populate("captain").select("+otp");

  return ride;
}

module.exports.confirmRideService = async(data)=>{
  const {rideId, otp, captainId} = data;

  const ride = await Ride.findById(rideId).select("+otp");

  if(!ride){
    throw new ExpressError(401, "Ride is not find.")
  }

  if(!otp){
    throw new ExpressError(401, "OTP is required.")
  }

  if(otp !== ride.otp){
    throw new ExpressError(401, "OTP is not matched.")
  }

  const confirmRide = await Ride.findByIdAndUpdate(rideId, {
    status: "ongoing"
  }).populate("user").populate("captain");

  return confirmRide

}
