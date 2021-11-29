const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.post("/accounts/create", adminController.store);
router.get("/accounts/edit", adminController.edit);
router.get("/create", adminController.showAction);
router.get("/", adminController.index);

module.exports = router;