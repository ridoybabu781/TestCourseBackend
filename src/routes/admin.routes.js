const { createAdmin } = require("../controllers/admin.controller");

const router = require("express").Router();

router.post("/oc/createAdmin", createAdmin);

module.exports = router;
