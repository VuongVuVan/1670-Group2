const express = require("express");
const router = express.Router();
const path = require("path");
const img = require("../utils/imageHandler");
const staffController = require("../controllers/StaffController");
const destination = path.join(__dirname, "../public/uploads/staff");
const width = height = 170;

router.get("/profile", staffController.show);
router.get("/edit", staffController.edit);
router.get("/", staffController.index);
router.get("/delete", staffController.delete);
router.post("/update", img.upload(destination), img.resize(width, height), staffController.update);
router.post("/store", img.upload(destination), img.resize(width, height), staffController.store);


/** (Vuong)
 *========================================================================================*
 *========================================================================================*
 *=========================Routers for trainee accounts management========================*
 *========================================================================================*
 *========================================================================================*
 */

module.exports = router;