const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");
const {isLogged, isLogged2} = require("../utils/authHandler");

router.get("/:slug/change_password", isLogged2, siteController.changePassword);
router.post("/:slug/store_password", isLogged2, siteController.storePassword);
router.post("/login", isLogged, siteController.login);
router.get("/logout", siteController.logout);
router.get("/", isLogged, siteController.indexAction);
router.get("/:slug", isLogged2, siteController.showProfile);

module.exports = router;