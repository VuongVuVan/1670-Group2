const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.get("/slider", adminController.create);
router.get("/", adminController.index);

module.exports = router;