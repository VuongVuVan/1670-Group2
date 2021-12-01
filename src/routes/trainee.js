const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const traineeController = require("../controllers/TraineeController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainee");

// router.get("/test", traineeController.test);
router.get("/layout", traineeController.layout);
router.get("/", traineeController.index);
router.get("/profile", traineeController.show);
router.post("/profile/store",img.upload(destination), traineeController.store);
router.get("/edit", img.upload(destination), traineeController.edit);

module.exports = router;