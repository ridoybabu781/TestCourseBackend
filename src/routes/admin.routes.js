const {
  createAdmin,
  approveInstructor,
  deleteProfile,
} = require("../controllers/admin.controller");
const isAdmin = require("../middleware/admin.check");
const User = require("../middleware/user.check");

const router = require("express").Router();

router.post("/oc/createAdmin", createAdmin);
router.post("/approveInstructor/:id", User, isAdmin, approveInstructor);
router.post("/deleteProfile/:id", User, isAdmin, deleteProfile);

module.exports = router;
