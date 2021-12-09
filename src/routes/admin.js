const express = require("express");
const router = express.Router();
const {isAdmin} = require("../utils/authHandler");
const adminController = require("../controllers/AdminController");
const img = require("../utils/imageHandler");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/admins");
const destination2 = path.join(__dirname, "../public/uploads/staffs");
const destination3 = path.join(__dirname, "../public/uploads/trainers");
const width = height = 170;

router.get("/trainer-accounts/search", isAdmin, adminController.searchTrainerAccounts);
router.get("/trainer-accounts/passwords/set_default", isAdmin, adminController.setDefaultPassTer);
router.post("/trainer-accounts/update", isAdmin, img.upload(destination3), img.resize(width, height), adminController.updateTrainerAccount);
router.get("/trainer-accounts/edit", isAdmin, adminController.editTrainerAccount);
router.post("/trainer-accounts/store", isAdmin, img.upload(destination3), img.resize(width, height), adminController.storeTrainerAccount);
router.get("/trainer-accounts/delete", isAdmin, adminController.deleteTrainerAccount);
router.get("/trainer-accounts", isAdmin, adminController.showTrainerAccounts);

router.get("/staff-accounts/search", isAdmin, adminController.searchStaffAccounts);
router.get("/staff-accounts/passwords/set_default", isAdmin, adminController.setDefaultPassS);
router.post("/staff-accounts/update", isAdmin, img.upload(destination2), img.resize(width, height), adminController.updateStaffAccount);
router.get("/staff-accounts/edit", isAdmin, adminController.editStaffAccount);
router.post("/staff-accounts/store", isAdmin, img.upload(destination2), img.resize(width, height), adminController.storeStaffAccount);
router.get("/staff-accounts/delete", isAdmin, adminController.deleteStaffAccount);
router.get("/staff-accounts", isAdmin, adminController.showStaffAccounts);

router.get("/admin-accounts/search", isAdmin, adminController.searchAdminAccounts);
router.get("/admin-accounts/passwords/set_default", isAdmin, adminController.setDefaultPassA);
router.post("/admin-accounts/update", isAdmin, img.upload(destination), img.resize(width, height), adminController.updateAdminAccount);
router.get("/admin-accounts/edit", isAdmin, adminController.editAdminAccount);
router.post("/admin-accounts/store", isAdmin, img.upload(destination), img.resize(width, height), adminController.storeAdminAccount);
router.get("/admin-accounts/delete", isAdmin, adminController.deleteAdminAccount);
router.get("/admin-accounts", isAdmin, adminController.showAdminAccounts);
router.get("/", isAdmin, adminController.indexAction);

module.exports = router;