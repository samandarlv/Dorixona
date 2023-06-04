const express = require("express");
const router = express.Router();
const regionContoller = require("../controllers/region");

// Hamma regionlarni oladi
router.get("/", regionContoller.getAllRegions);

// Yangi region create qiladi
router.post("/", regionContoller.createRegion);

// id bo'yicha region topib beradi
router.get("/:id", regionContoller.getRegionById);

// id bo'yicha update qilish
router.put("/:id", regionContoller.updateRegion);

// id bo'yicha delete qilish
router.delete("/:id", regionContoller.deleteRegion);

module.exports = router;
