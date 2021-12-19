const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const traineeController = require("../controllers/TraineeController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainee");
const width = height = 170;
const { isTrainee } = require("../utils/authHandler");

router.get("/profile", traineeController.show);
router.get("/edit", traineeController.edit);
router.get("/", traineeController.index);

router.post("/update", img.upload(destination), img.resize(width, height), traineeController.update);


router.get("/layout", isTrainee, traineeController.layout);
module.exports = router;