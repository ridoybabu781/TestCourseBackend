const {
  createAdmin,
  approveInstructor,
  rejectInstructor,
  deleteProfile,
} = require("../controllers/admin.controller");
const isAdmin = require("../middleware/admin.check");
const User = require("../middleware/user.check");
const validator = require("../validator/middlewares/validate");
const { userSchema } = require("../validator/schemas/user.schema");

const router = require("express").Router();

router.post("/oc/createAdmin", validator(userSchema), createAdmin);
router.put("/approveInstructor/:id", User, isAdmin, approveInstructor);
router.put("/rejectInstructor/:id", User, isAdmin, rejectInstructor);
router.delete("/deleteProfile/:id", User, isAdmin, deleteProfile);

module.exports = router;
