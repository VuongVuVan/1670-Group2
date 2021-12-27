const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/TrainerController");
const path = require("path");
const { route } = require("express/lib/application");


router.get("/assignedCourse", trainerController.showAssignedCourses);
router.get("/assignedCourse/viewclass", trainerController.view);
router.post("/assignedCourse/viewclass", trainerController.viewClassWithSearch);
router.get("/", trainerController.index);
router.post("/updateGrade", trainerController.updateGrade);
router.get("/viewTraineeStatus", trainerController.viewTraineeStatus)
router.get("/profile", trainerController.viewProfile)
module.exports = router;