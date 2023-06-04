const express = require("express");
const router = express.Router();
const pharmController = require("../controllers/pharmacies");

router.get("/", pharmController.getAllPharm);
router.post("/", pharmController.createPharm);
router.get("/:id", pharmController.getPharmById);
router.put("/:id", pharmController.updatePharm);
router.delete("/:id", pharmController.deletePharm);

module.exports = router