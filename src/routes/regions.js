const express = require("express");
const {getAllRegions, getRegionById} = require("../services/regionService");
const router = express.Router();

// GET all regions
router.get("/", (req, res) => {
    const regions = getAllRegions();

    res.json({
        total: regions.length,
        results: regions
    });
});

// GET region by ID
router.get("/:id", (req, res) => {
    const region = getRegionById(req.params.id);

    if (!region) {
        return res.status(404).json({
            error: "Region not found"
        });
    }

    res.json({
        data: region,
        meta: {
            type: "region",
            id: region.id
        }
    });
});

module.exports = router;