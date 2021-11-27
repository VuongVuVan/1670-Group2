const express = require("express");
const router = express.Router();
const traineeController = require("../controllers/TraineeController");

router.get("/test", traineeController.test);
router.get("/create", traineeController.create);
router.get("/", traineeController.index);

module.exports = router;