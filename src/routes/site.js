const express = require("express");
const router = express.Router();
const path = require("path");
const siteController = require("../controllers/SiteController");
const { isLogged, isLogged2 } = require("../utils/authHandler");
const img = require("../utils/imageHandler");
const destination = path.join(__dirname, "../public/uploads/profile");
const width = height = 170;


router.get("/:slug/edit_profile", isLogged2, siteController.editProfile);
router.post("/:slug/update_profile", isLogged2, img.upload(destination), img.resize(width, height), siteController.updateProfile);
router.get("/:slug/change_password", isLogged2, siteController.changePassword);
router.post("/:slug/store_password", isLogged2, siteController.storePassword);
router.post("/login", isLogged, siteController.login);
router.get("/logout", siteController.logout);
router.get("/", isLogged, siteController.indexAction);
router.get("/:slug", isLogged2, siteController.showProfile);


module.exports = router;