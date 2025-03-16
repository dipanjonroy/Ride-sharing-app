const axios = require("axios");
const Captain = require("../models/captainModel");
const ExpressError = require("../utility/expresserror");

module.exports.getAddressCoordinate = async (address) => {
  const api = process.env.GOPROMAP_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${api}`;

  const { data } = await axios.get(url);

  if (!data) {
    throw new ExpressError(401, "Location not found.");
  }

  const location = data.results[0].geometry.location;

  return {
    ltd: location.lat,
    lng: location.lng,
  };
};

module.exports.getDistance = async (origin, destination) => {
  if (!destination || !origin) {
    throw new ExpressError(401, "Destionations & Origins are required.");
  }

  const api = process.env.GOPROMAP_API;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(
    destination
  )}&origins=${encodeURIComponent(origin)}&key=${api}`;

  const { data } = await axios.get(url);

  if (!data) {
    throw new ExpressError(401, "Data not found");
  }

  return data.rows[0].elements[0];
};

module.exports.getCaptainInRadius = async (ltd, lng, radius, vehicleType) => {
  const vehicle = vehicleType.toLowerCase()
  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },

    "vehicle.type": vehicle,
  });


  return captains;
};
