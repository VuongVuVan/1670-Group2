const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const trainerController = require("../controllers/TrainerController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainer");

router.get("/search", trainerController.search);
router.get("/delete", trainerController.delete);
router.get("/edit", trainerController.edit);
router.post("/update", trainerController.update);
router.get("/create", trainerController.create);
router.post("/store", img.upload(destination), trainerController.store);
// router.get("/", trainerontroller.show);

module.exports = router;