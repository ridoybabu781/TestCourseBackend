const jwt = require("jsonwebtoken");
const config = require("../config");
const createHttpError = require("http-errors");

const User = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(createHttpError(401, "Unauthorized User"));
    }

    const decode = jwt.verify(token, config.jwt_secret);

    req.userId = decode.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = User;
