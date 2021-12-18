const express = require("express");
const router = express.Router();
const path = require("path");
const { isStaff } = require("../utils/authHandler");
const destination2 = path.join(__dirname, "../public/uploads/trainees");
const img = require("../utils/imageHandler");
const staffController = require("../controllers/StaffController");
const width = height = 170;

/** 
 *========================================================================================*
 *========================================================================================*
 *==================================Routers for Staff=====================================*
 *========================================================================================*
 *========================================================================================*
 */
router.get("/", isStaff, staffController.index);


/** 
 *========================================================================================*
 *========================================================================================*
 *==================================Routers for Category==================================*
 *========================================================================================*
 *========================================================================================*
 */
router.get("/categories/delete", isStaff, staffController.deleteCategory);
router.get("/categories/edit", isStaff, staffController.editCategory);
router.post("/categories/update", isStaff, staffController.updateCategory);
router.post("/categories/store", isStaff, staffController.storeCategory);
router.get("/categories/search", isStaff, staffController.searchCategory);
router.get("/categories", isStaff, staffController.showCategories);

/** 
 *========================================================================================*
 *========================================================================================*
 *===================================Routers for Course===================================*
 *========================================================================================*
 *========================================================================================*
 */
router.get("/courses/delete", isStaff, staffController.deleteCourse);
router.get("/courses/edit", isStaff, staffController.editCourse);
router.post("/courses/update", isStaff, staffController.updateCourse);
router.post("/courses/store", isStaff, staffController.storeCourse);
router.get("/courses/search", isStaff, staffController.searchCourse);
router.get("/courses", isStaff, staffController.showCourses);

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