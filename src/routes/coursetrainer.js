const express = require("express");
const router = express.Router();
const coursetrainerController = require("../controllers/CourseTrainerController");

router.get("/search", coursetrainerController.search);
router.get("/delete", coursetrainerController.delete);
router.get("/edit", coursetrainerController.edit);
router.post("/update", coursetrainerController.update);
router.get("/create", coursetrainerController.create);
<<<<<<< HEAD
// router.post("/store", img.upload(destination), coursetrainerController.store);
router.get("/", coursetrainercontroller.show);
=======
router.post("/store", coursetrainerController.store);
router.get("/", coursetrainerController.show);
>>>>>>> dbf9248e9d612868eee3beb0182ecfee101975ff

module.exports = router;