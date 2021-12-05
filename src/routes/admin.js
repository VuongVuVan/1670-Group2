const express = require("express");
const router = express.Router();
const {isAdmin} = require("../utils/authHandler");
const adminController = require("../controllers/AdminController");
const img = require("../utils/imageHandler");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/admins");
const width = height = 170;

router.post("/admin-accounts/update", isAdmin, img.upload(destination), img.resize(width, height), adminController.update);
router.get("/admin-accounts/edit", isAdmin, adminController.edit);
router.post("/admin-accounts/store", isAdmin, img.upload(destination), img.resize(width, height), adminController.store);
router.get("/admin-accounts/delete", isAdmin, adminController.delete);
router.get("/admin-accounts", isAdmin, adminController.showAction);
router.get("/", isAdmin, adminController.indexAction);

module.exports = router;