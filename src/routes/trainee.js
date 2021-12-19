const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const traineeController = require("../controllers/TraineeController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/trainee");
const width = height = 170;
const { isTrainee } = require("../utils/authHandler");

router.get("/view-alltrainee", isTrainee, traineeController.show);
router.get("/view-alltrainee/edit", isTrainee, traineeController.edit);
router.get("/", isTrainee, traineeController.index);
// router.get("/delete",isTrainee, traineeController.delete);
router.post("/view-alltrainee/update", isTrainee, img.upload(destination), img.resize(width, height), traineeController.update);
router.post("/view-alltrainee/store",isTrainee, img.upload(destination), img.resize(width, height), traineeController.store);

// design course
router.get("/designatedcourse", isTrainee, traineeController.showdesignatedcourse);
router.post("/designatedcourse/store",isTrainee, traineeController.storedesignatedcourse);
router.get("/designatedcourse/search", isTrainee, traineeController.searchdesignatedcourse);
router.get("/designatedcourse/edit", isTrainee, traineeController.editdesignatedcourse);
router.post("/designatedcourse/update", isTrainee, traineeController.updatedesignatedcourse);
router.get("/designatedcourse/delete", isTrainee, traineeController.deletedesignatedcourse);

// view grade
router.get("/view-grade", isTrainee, traineeController.showtraineegrade);
router.post("/view-grade/store",isTrainee, traineeController.storetraineegrade);
router.get("/view-grade/search", isTrainee, traineeController.searchtraineegrade);
router.get("/view-grade/edit", isTrainee, traineeController.edittraineegrade);
router.post("/view-grade/update", isTrainee, traineeController.updatetraineegrade);
router.get("/view-grade/delete", isTrainee, traineeController.deletetraineegrade);

// Curriculum
router.get("/curriculum", isTrainee, traineeController.showcurriculum);
router.post("/curriculum/store",isTrainee, traineeController.storecurriculum);
router.get("/curriculum/search", isTrainee, traineeController.searchcurriculum);
router.get("/curriculum/edit", isTrainee, traineeController.editcurriculum);
router.post("/curriculum/update", isTrainee, traineeController.updatecurriculum);
router.get("/curriculum/delete", isTrainee, traineeController.deletecurriculum);

// router.get("/layout",isTrainee,  traineeController.layout);
module.exports = router;