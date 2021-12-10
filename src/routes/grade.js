const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/GradeController");

// router.get("/search", gradeController.search);
router.get("/delete", gradeController.delete);
router.get("/edit", gradeController.edit);
// router.post("/update", gradeController.update);
router.get("/create", gradeController.create);
router.post("/store", gradeController.store);
router.get("/", gradeController.show);

module.exports = router;