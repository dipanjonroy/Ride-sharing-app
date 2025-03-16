require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/dbConfig");

const userRoutes = require("./routes/userRoutes");
const captainRoutes = require("./routes/captainRoutes");
const mapRoutes = require("../src/routes/mapRoute");
const rideRoutes = require("../src/routes/rideRoute");

const ExpressError = require("./utility/expresserror");
const app = express();

connectToDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/ride", rideRoutes);

//ERROR Handleing
app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found."));
});

app.use((err, req, res, next) => {
  console.log(err);
  let { status = 500, message = "Server side issues" } = err;
  res.status(status).json({ success: false, message: message });
});

module.exports = app;
