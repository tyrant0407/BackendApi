require("dotenv").config("path", "./.env");

const mongoose = require("mongoose");

exports.databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connection Established!");
  } catch (error) {
    console.log(error.message);
  }
};
