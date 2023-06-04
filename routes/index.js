const express = require("express");
const router = express.Router();

const medicineRouter = require("./medicine");
router.use("/medicines", medicineRouter);

const regionRouter = require("./region");
router.use("/regions", regionRouter);

const typeRouter = require("./medicineType");
router.use("/medicine-type", typeRouter);

const districtRouter = require("./district");
router.use("/districts", districtRouter);

const pharmRouter = require("./pharmacies");
router.use("/pharmacies", pharmRouter);

const stockRouter = require("./stock");
router.use("/stock", stockRouter);

module.exports = router;