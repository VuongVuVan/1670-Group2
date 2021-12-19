const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const trainerController = require("../controllers/TrainerController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainer");


router.get("/assignedCourse", trainerController.showAssignedCourses);
router.get("/assignedCourse/viewclass", trainerController.view);
router.get("/", trainerController.index);
router.get("/viewGrade", trainerController.showViewGrade);


module.exports = router;