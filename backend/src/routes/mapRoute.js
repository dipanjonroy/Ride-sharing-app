const express = require("express");
const {
  getCoordinate,
  getDistance,
  getSuggestions,
} = require("../controllers/mapsController");
const wrapAsync = require("../utility/wrapasync");

const router = express.Router();

router.get("/get-cooridnates", wrapAsync(getCoordinate));
router.get("/getdistance", wrapAsync(getDistance));
router.get("/getsuggestions", wrapAsync(getSuggestions));

module.exports = router;
