const express = require("express");
const {getAllWeapons, getWeaponById} = require("../services/weaponService");

const router = express.Router();

// GET all weapons
router.get("/", (req, res) => {
    const weapons = getAllWeapons();

    res.json({
        total: weapons.length,
        results: weapons
    });
});

// GET weapon by ID
router.get("/:id", (req, res) => {
    const weapon = getWeaponById(req.params.id);

    if (!weapon) {
        return res.status(404).json({
            error: "Weapon not found"
        });
    }

    res.json({
        data: weapon,
        meta: {
            type: "weapon",
            id: weapon.id
        }
    });
});

module.exports = router;