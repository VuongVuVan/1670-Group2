const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");
const { isLogged } = require("../utils/authHandler");

router.post("/login", isLogged, siteController.loginAction);
router.get("/logout", isLogged, siteController.logoutAction);
router.get("/", isLogged, siteController.indexAction);

module.exports = router;