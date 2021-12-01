const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadImage");
const staffController = require("../controllers/StaffController");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/demo");

router.get("/profile", staffController.show);
router.get("/edit", staffController.edit);
router.post("/update", staffController.update);
router.get("/", staffController.index);
router.post("/store", upload(avatarPath).single("image"), staffController.store);

module.exports = router;