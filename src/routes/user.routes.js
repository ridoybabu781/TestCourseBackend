const {
  createUser,
  login,
  profile,
} = require("../controllers/user.controller");
const validator = require("../validator/middlewares/validate");
const { userSchema, loginSchema } = require("../validator/schemas/user.schema");
const User = require("../middleware/user.check");

const router = require("express").Router();

router.post("/register", validator(userSchema), createUser);
router.post("/login", validator(loginSchema), login);
router.post("/profile", User, profile);

module.exports = router;
