const express = require("express");
const router = express.Router();
const districtContoller = require("../controllers/district");

router.get("/", districtContoller.getAllDistricts);
router.post("/", districtContoller.createDistrict);
router.get("/:id", districtContoller.getDistrictById);
router.put("/:id", districtContoller.updateDistrict);
router.delete("/:id", districtContoller.deleteDistrict);

module.exports = router;
