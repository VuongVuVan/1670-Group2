const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");
const { isLogged } = require("../utils/authHandler");

router.get("/:slug/change_password", siteController.changePassword);
router.post("/:slug/store_password", siteController.storePassword);
router.post("/login", isLogged, siteController.login);
router.get("/logout", siteController.logout);
router.get("/", isLogged, siteController.indexAction);
router.get("/:slug", siteController.showProfile);

module.exports = router;