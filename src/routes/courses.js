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

// router.get("/designatedcourse", courseController.showdesignatedcourse);
// router.get("/designatedcourse/store", courseController.storedesignatedcourse);

module.exports = router;