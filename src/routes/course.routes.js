const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const isInstructor = require("../middleware/instructor.check");
const User = require("../middleware/user.check");
const validator = require("../validator/middlewares/validate");
const courseSchema = require("../validator/schemas/course.schema");

const router = require("express").Router();

router.post(
  "/addCourse",
  validator(courseSchema),
  User,
  isInstructor,
  createCourse
);
router.post("/getCourses", getCourses);
router.post("/getCourse/:id", getCourse);
router.put("/updateCourse/:id", User, isInstructor, updateCourse);
router.put("/deleteCourse/:id", User, isInstructor, deleteCourse);

module.exports = router;
