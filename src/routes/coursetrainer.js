const express = require("express");
const router = express.Router();
const coursetrainerController = require("../controllers/CourseTrainerController");

router.get("/search", coursetrainerController.search);
router.get("/delete", coursetrainerController.delete);
router.get("/edit", coursetrainerController.edit);
router.post("/update", coursetrainerController.update);
router.get("/create", coursetrainerController.create);
<<<<<<< HEAD
router.post("/store", coursetrainerController.store);
router.get("/", coursetrainerController.show);
=======
// router.post("/store", img.upload(destination), coursetrainerController.store);
router.get("/", coursetrainercontroller.show);
>>>>>>> 2696d34ab7a28e1cfc87f84ec7d3492fe0a9aa0c

module.exports = router;