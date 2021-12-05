const express = require("express");
const router = express.Router();
const {isAdmin} = require("../utils/authHandler");
const adminController = require("../controllers/AdminController");
const img = require("../utils/imageHandler");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/admins");
const width = height = 170;

router.get("/admin-accounts/passwords/set_default", isAdmin, adminController.setDefaultPassA);
router.post("/admin-accounts/update", isAdmin, img.upload(destination), img.resize(width, height), adminController.updateAdminAccount);
router.get("/admin-accounts/edit", isAdmin, adminController.editAdminAccount);
router.post("/admin-accounts/store", isAdmin, img.upload(destination), img.resize(width, height), adminController.storeAdminAccount);
router.get("/admin-accounts/delete", isAdmin, adminController.deleteAdminAccount);
router.get("/admin-accounts", isAdmin, adminController.showAdminAccounts);
router.get("/", isAdmin, adminController.indexAction);

module.exports = router;