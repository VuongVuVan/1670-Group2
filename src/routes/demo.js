const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadImage");
const demoController = require("../controllers/DemoController");
const path = require("path");
const currentPath = path.join(__dirname, "../public/uploads/demo");

router.get("/search", demoController.search);
router.get("/delete", demoController.delete);
router.get("/edit", demoController.edit);
router.post("/update", demoController.update);
router.get("/create", demoController.create);
router.post("/store", upload(currentPath).single("image"), demoController.store);
router.get("/", demoController.show);

module.exports = router;