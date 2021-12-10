const express = require("express");
const router = express.Router();
const coursetrainerController = require("../controllers/CourseTrainerController");

router.get("/search", coursetrainerController.search);
router.get("/delete", coursetrainerController.delete);
router.get("/edit", coursetrainerController.edit);
router.post("/update", coursetrainerController.update);
router.get("/create", coursetrainerController.create);
// router.post("/store", img.upload(destination), coursetrainerController.store);
router.get("/", coursetrainercontroller.show);

module.exports = router;