const { getDistance } = require("../services/MapServices");
const ExpressError = require("../utility/expresserror");
const axios = require("axios");

module.exports.getCoordinate = async (req, res) => {
  const { address } = req.query;

  const api = process.env.GOPROMAP_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${api}`;

  const data = await axios.get(url);

  if (!data) {
    throw new ExpressError(401, "Location not found");
  }

  const location = data.results[0].geometry.location;

  res.json({
    success: true,
    location,
  });
};

module.exports.getDistance = async (req, res) => {
  const { destinations, origins } = req.query;

  const distance = await getDistance(destinations, origins);

  res.json({
    success: true,
    distance,
  });
};

module.exports.getSuggestions = async (req, res) => {
  const { input } = req.query;

  const api = process.env.GOPROMAP_API;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${api}`;

  const { data } = await axios.get(url);

  if (!data) {
    throw new ExpressError(401, "Data not found");
  }


  res.json({
    success: true,
    data: data.predictions,
  });
};
