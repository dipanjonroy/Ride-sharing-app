const mongoose = require("mongoose");
const { dbUrl } = require("../secret");

async function connectToDb() {
  await mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDb;
