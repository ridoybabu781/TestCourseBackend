require("dotenv").config();
const mongoose = require("mongoose");

const config = {
  db_uri: process.env.DB_URI,
  jwt_secret: process.env.JWT_SECRET,
  cors: process.env.CORS,

  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS,

  cName: process.env.CNAME,
  cApi: process.env.CAPI_KEY,
  cSecret: process.env.CAPI_SECRET,
  database: async () => {
    try {
      await mongoose.connect(config.db_uri);
      console.log("Database Connected Successfully");
    } catch (error) {
      console.log("Database Connection Failed");
    }
  },
};
module.exports = config;
