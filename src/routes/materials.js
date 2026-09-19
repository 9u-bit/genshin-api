const express = require("express");
const {getAllMaterials, getMaterialById} = require("../services/materialService");
const router = express.Router();

// GET all materials
router.get("/", (req, res) => {
    const materials = getAllMaterials();

    res.json({
        total: materials.length,
        results: materials
    });
});

// GET material by ID
router.get("/:id", (req, res) => {
    const material = getMaterialById(req.params.id);

    if (!material) {
        return res.status(404).json({
            error: "Material not found"
        });
    }

    res.json({
        data: material,
        meta: {
            type: "material",
            id: material.id
        }
    });
});

module.exports = router;