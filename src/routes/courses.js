const express = require("express");
const router = express.Router();
const courseController = require("../controllers/CourseController");

router.get("/delete", courseController.delete);
router.get("/edit", courseController.edit);
router.post("/update", courseController.update);
router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.get("/search", courseController.search);
router.get("/", courseController.show);

module.exports = router;