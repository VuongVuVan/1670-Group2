const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const trainerController = require("../controllers/TrainerController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainer");

<<<<<<< HEAD
// router.get("/test", traineeController.test);
router.get("/layout", trainerController.layout);
router.get("/", trainerController.index);
router.get("/profile", trainerController.show);
router.post("/profile/store", img.upload(destination), trainerController.store);
router.get("/edit", img.upload(destination), trainerController.edit);
=======
router.get("/search", trainerController.search);
router.get("/delete", trainerController.delete);
router.get("/edit", trainerController.edit);
router.post("/update", trainerController.update);
router.get("/create", trainerController.create);
// router.post("/store", img.upload(destination), trainerController.store);
// router.get("/", trainerontroller.show);
>>>>>>> 2696d34ab7a28e1cfc87f84ec7d3492fe0a9aa0c

module.exports = router;