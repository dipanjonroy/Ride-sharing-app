const axios = require("axios");

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
