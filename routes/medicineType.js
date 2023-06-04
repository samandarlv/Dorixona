const express = require("express");
const router = express.Router();
const typeController = require("../controllers/medicineType");

router.get("/", typeController.getAll);
router.post("/", typeController.create);
router.get("/:id", typeController.getById);
router.put("/:id", typeController.update);
router.delete("/:id", typeController.delete);

module.exports = router;