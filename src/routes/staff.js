const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const staffController = require("../controllers/StaffController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/demo");

router.get("/profile", staffController.show);
router.get("/edit", staffController.edit);
router.post("/update", staffController.update);
router.get("/", staffController.index);
router.post("/store", img.upload(destination), staffController.store);

module.exports = router;