const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");

router.get("/slider", siteController.slider);
router.get("/", siteController.index);

module.exports = router;