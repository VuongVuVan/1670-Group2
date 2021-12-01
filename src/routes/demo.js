const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const upload = require("../utils/imageHandler");
=======
const img = require("../utils/imageHandler");
>>>>>>> 221f796f29b27659e58ad3b05c83ca20e3e78870
const demoController = require("../controllers/DemoController");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/demo");

router.get("/search", demoController.search);
router.get("/delete", demoController.delete);
router.get("/edit", demoController.edit);
router.post("/update", demoController.update);
router.get("/create", demoController.create);
router.post("/store", img.upload(destination), demoController.store);
router.get("/", demoController.show);

module.exports = router;