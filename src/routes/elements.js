const express = require("express");
const {getAllElements, getElementById} = require("../services/elementService");

const router = express.Router();

// GET all elements
router.get("/", (req, res) => {
    const elements = getAllElements();

    res.json({
        total: elements.length,
        results: elements
    });
});

// GET element by ID
router.get("/:id", (req, res) => {
    const element = getElementById(req.params.id);

    if (!element) {
        return res.status(404).json({
            error: "Element not found"
        });
    }

    res.json({
        data: element,
        meta: {
            type: "element",
            id: element.id
        }
    });
});

module.exports = router;