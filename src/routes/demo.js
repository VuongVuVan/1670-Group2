const express = require("express");
const router = express.Router();
const demoController = require("../controllers/DemoController");

router.get("/search", demoController.search);
router.get("/delete", demoController.delete);
router.get("/edit", demoController.edit);
router.post("/update", demoController.update);
router.get("/create", demoController.create);
router.post("/store", demoController.store);
router.get("/", demoController.show);

module.exports = router;