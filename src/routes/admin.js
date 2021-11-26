const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.get("/test", adminController.test);
router.get("/create", adminController.create);
router.get("/", adminController.index);

module.exports = router;