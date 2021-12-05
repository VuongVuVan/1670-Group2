const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");
const { isLogged } = require("../utils/authHandler");

router.post("/login", isLogged, siteController.login);
router.get("/logout", siteController.logout);
router.get("/", isLogged, siteController.indexAction);

module.exports = router;