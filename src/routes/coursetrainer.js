const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const coursetrainerController = require("../controllers/CourseTrainerController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/coursetrainer");

router.get("/search", coursetrainerController.search);
router.get("/delete", coursetrainerController.delete);
router.get("/edit", coursetrainerController.edit);
router.post("/update", coursetrainerController.update);
router.get("/create", coursetrainerController.create);
// router.post("/store", img.upload(destination), coursetrainerController.store);
router.get("/", coursetrainercontroller.show);

module.exports = router;