const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const img = require("../utils/imageHandler");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/admins");

router.get("/accounts/edit", adminController.edit);
router.post("/admin-accounts/store", img.upload(destination), img.resize, adminController.store);
router.get("/admin-accounts/delete", adminController.delete);
router.get("/admin-accounts", adminController.showAction);
router.get("/", adminController.index);

module.exports = router;