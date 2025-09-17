const mongoose = require("mongoose");
const config = require("./index");
require("dotenv").config();

const database = async () => {
  try {
    await mongoose.connect(config.db_uri);
  } catch (error) {
    console.log("Database Connection Failed");
  }
};

module.exports = database;
