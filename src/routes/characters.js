const express = require("express");
const {getAllCharacters, getCharacterById} = require("../services/characterService");
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
        const validElements = ["anemo", "geo", "electro", "dendro", "hydro", "pyro", "cryo"];

        const element = req.query.element.toLowerCase();

        if (!validElements.includes(element)) {
            return res.status(400).json({
                error: "Invalid element",
                validElements: validElements
            });
        }

        results = results.filter(
            (character) => character.element.toLowerCase() === element
        );
    }

    // Weapon
    if (req.query.weapon) {
        const validWeapon = ["sword", "claymore", "polearm", "bow", "catalyst"];

        const weapon = req.query.weapon.toLowerCase();

        if (!validWeapon.includes(weapon)) {
            return res.status(400).json({
                error: "Invalid weapon",
                validWeapon: validWeapon
            });
        }

        results = results.filter(
            (character) => character.weapon.toLowerCase === weapon
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
        element: character.element,
        weapon: character.weapon,
        rarity: character.rarity,
        region: character.region,
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

    res.json({
        data: character,
        meta: {
            type: "character",
            id: character.id
        }
    });
});

module.exports = router;