const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.get("/accounts/edit", adminController.edit);
router.post("/admin-accounts/store", adminController.store);
router.get("/admin-accounts", adminController.showAction);
router.get("/", adminController.index);

module.exports = router;