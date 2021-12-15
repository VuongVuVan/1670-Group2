const express = require("express");
const router = express.Router();
const path = require("path");
const { isStaff } = require("../utils/authHandler");
const destination2 = path.join(__dirname, "../public/uploads/trainees");
const img = require("../utils/imageHandler");
const staffController = require("../controllers/StaffController");
const width = height = 170;


// router.get("/profile", staffController.showProfile);
// router.get("/edit", staffController.edit);
router.get("/", staffController.index);
// router.post("/update", img.upload(destination), img.resize(width, height), staffController.update);



/** (Vuong)
 *========================================================================================*
 *========================================================================================*
 *=========================Routers for trainee accounts management========================*
 *========================================================================================*
 *========================================================================================*
 */
router.get("/trainee-accounts/search", staffController.searchTraineeAccounts);
router.get("/trainee-accounts/passwords/set_default", staffController.setDefaultPassTee);
router.post("/trainee-accounts/update", img.upload(destination2), img.resize(width, height), staffController.updateTraineeAccount);
router.get("/trainee-accounts/edit", staffController.editTraineeAccount);
router.post("/trainee-accounts/store", img.upload(destination2), img.resize(width, height), staffController.storeTraineeAccount);
router.get("/trainee-accounts/delete", staffController.deleteTraineeAccount);
router.get("/trainee-accounts", staffController.showTraineeAccounts);

module.exports = router;