const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine");

// router.get("/", medicineController.getAllMedicine);
router.post("/", medicineController.createMedicine);
router.get("/", medicineController.getMedicineByName);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", medicineController.deleteMedicine);

module.exports = router