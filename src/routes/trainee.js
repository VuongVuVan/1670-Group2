const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadImage");
const traineeController = require("../controllers/TraineeController");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainee");

// router.get("/test", traineeController.test);
router.get("/layout", traineeController.layout);
router.get("/", traineeController.index);
router.get("/profile", traineeController.show);
router.post("/profile/store",upload(avatarPath).single("image"), traineeController.store);
router.get("/edit", upload(avatarPath).single("image"), traineeController.edit);

module.exports = router;