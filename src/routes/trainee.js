const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const traineeController = require("../controllers/TraineeController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainee");
const width = height = 170;
const {isTrainee} = require("../utils/authHandler");

router.get("/profile",isTrainee, traineeController.show);
router.get("/edit",isTrainee, traineeController.edit);
router.get("/",isTrainee, traineeController.index);
router.get("/delete",isTrainee, traineeController.delete);
router.get("/update",isTrainee, img.upload(destination), img.resize(width, height), traineeController.update);
router.post("/profile/store",isTrainee, img.upload(destination), img.resize(width, height), traineeController.store);

router.get("/layout",isTrainee,  traineeController.layout);
module.exports = router;