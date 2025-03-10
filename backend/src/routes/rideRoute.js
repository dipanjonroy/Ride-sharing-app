const express = require("express");
const wrapAsync = require("../utility/wrapasync");
const { createRide } = require("../controllers/rideController");
const { isLoggedInUser } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/createRide", isLoggedInUser, wrapAsync(createRide));

module.exports = router;
