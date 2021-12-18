const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/TrainerController");
const path = require("path");


// router.get("/search", trainerController.search);
// router.get("/delete", trainerController.delete);

// router.get("/create", trainerController.create);
// router.post("/store", img.upload(destination), trainerController.store);
router.get("/", trainerController.index);

module.exports = router;