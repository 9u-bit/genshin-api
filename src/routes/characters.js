const express = require("express");
const {getAllCharacters, getCharacterById} = require("../services/characterService");
const {getMaterialById} = require("../services/materialService");
const {getAllRegions, getRegionById} = require("../services/regionService");
const {getAllElements, getElementById} = require("../services/elementService");
const {getAllWeapons, getWeaponById} = require("../services/weaponService");
const router = express.Router();

// GET all characters + filters
router.get("/", (req, res) => {
    let results = getAllCharacters();

    // Pagination
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Element
    if (req.query.element) {
        const element = req.query.element.toLowerCase();
        const validElements = getAllElements().map((element) => element.id);

        if (!validElements.includes(element)) {
            return res.status(400).json({
                error: "Invalid element",
                validElements: validElements
            });
        }

        results = results.filter(
            (character) => character.element_id.toLowerCase() === element
        );
    }

    // Weapon
    if (req.query.weapon) {
        const weapon = req.query.weapon.toLowerCase();
        const validWeapons = getAllWeapons().map((weapon) => weapon.id);

        if (!validWeapons.includes(weapon)) {
            return res.status(400).json({
                error: "Invalid weapon",
                validWeapons: validWeapons
            });
        }

        results = results.filter(
            (character) => character.weapon_id.toLowerCase() === weapon
        );
    }

    // Rarity
    if (req.query.rarity) {
        const rarity = Number(req.query.rarity);

        if (![4, 5].includes(rarity)) {
            return res.status(400).json({
                error: "Rarity must be 4 or 5"
            });
        }

        results = results.filter(
            (character) => character.rarity === rarity
        )
    }

    // Region

    if (req.query.region) {
        const region = req.query.region.toLowerCase();
        const validRegions = getAllRegions().map((region) => region.id);

        if (!validRegions.includes(region)) {
            return res.status(400).json({
                error: "Invalid region",
                validRegions: validRegions
            });
        }

        results = results.filter(
            (character) => character.region_id.toLowerCase() === region
        );
    }

    // Name
    if (req.query.name) {
        results = results.filter(
            (character) =>
                character.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    // Pagination results
    const paginatedResults = results.slice(startIndex, endIndex);

    // Character summaries
    const summaries = paginatedResults.map((character) => ({
        id: character.id,
        name: character.name,
        title: character.title,
        element_id: character.element_id,
        weapon_id: character.weapon_id,
        rarity: character.rarity,
        region_id: character.region_id,
        birthday: character.birthday,
        images: character.images
    }));

    res.json({
        page: page,
        limit: limit,
        total: results.length,
        results: summaries
    });
});

// GET character by ID
router.get("/:id", (req, res) => {
    const character = getCharacterById(req.params.id);

    if (!character) {
        return res.status(404).json({
            error: "Character not found"
        });
    }

    const characterWithMaterials = {
        ...character,
        element: getElementById(character.element_id),
        weapon: getWeaponById(character.weapon_id),
        region: getRegionById(character.region_id),
        ascension: {
            ...character.ascension,
            material: getMaterialById(character.ascension.material_id),
            local_specialty: getMaterialById(character.ascension.local_specialty_id),
            boss_material: getMaterialById(character.ascension.boss_material_id)
        }
    };

    res.json({
        data: characterWithMaterials,
        meta: {
            type: "character",
            id: character.id
        }
    });
});

module.exports = router;