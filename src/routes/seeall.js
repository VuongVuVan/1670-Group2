const express = require("express");
const router = express.Router();
const seeallController = require("../controllers/SeeallController");

router.get("/search", seeallController.search);
router.get("/delete", seeallController.delete);
router.get("/edit", seeallController.edit);
router.post("/update", seeallController.update);
router.get("/create", seeallController.create);
router.post("/store", seeallController.store);
router.get("/", seeallController.show);

router.get("/view", seeallController.showviewtrainee);
router.get("/view/delete", seeallController.deleteviewtrainee);
module.exports = router;