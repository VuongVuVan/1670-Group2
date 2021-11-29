const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/TrainerController");

router.get("/test", trainerController.test);
router.get("/create", trainerController.create);
router.get("/", trainerController.index);

module.exports = router;