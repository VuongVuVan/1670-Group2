const express = require("express");
const router = express.Router();
const img = require("../utils/imageHandler");
const demoController = require("../controllers/DemoController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/demo");

router.get("/search", demoController.search);
router.get("/delete", demoController.delete);
router.get("/edit", demoController.edit);
router.post("/update", demoController.update);
router.get("/create", demoController.create);
// router.post("/store", img.upload(destination), demoController.store);
router.get("/", demoController.show);

module.exports = router;