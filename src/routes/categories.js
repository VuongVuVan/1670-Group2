const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.get("/delete", categoryController.delete);
router.get("/edit", categoryController.edit);
router.post("/update", categoryController.update);
router.get("/create", categoryController.create);
router.post("/store", categoryController.store);
router.get("/search", categoryController.search);
router.get("/", categoryController.show);


module.exports = router;