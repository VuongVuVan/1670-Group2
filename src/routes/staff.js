const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const staffController = require("../controllers/StaffController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/staff");
const width = height = 170;

router.get("/profile", staffController.show);
router.get("/edit", staffController.edit);
router.get("/", staffController.index);
router.post("/update", img.upload(destination), img.resize(width, height), staffController.update);
router.post("/store", img.upload(destination), img.resize(width, height), staffController.store);

module.exports = router;