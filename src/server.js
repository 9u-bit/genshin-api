const express = require("express");
const charactersRouter = require("./routes/characters.js");
const materialsRouter = require("./routes/materials.js");
const regionsRouter = require("./routes/regions.js");
const elementsRouter = require("./routes/elements");
const weaponsRouter = require("./routes/weapons");
const {getAllCharacters} = require("./services/characterService.js");
const {getAllMaterials} = require("./services/materialService.js");
const {getAllElements} = require("./services/elementService");
const {getAllWeapons} = require("./services/weaponService");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Genshin Impact API is running !!"
    });
});

app.get("/api", (req, res) => {
    res.json({
        name: "Genshin Impact API",
        version: "1.0.0",
        status: "online",
        description: "A custom API for Genshin Impact game data.",
        counts: {
            characters: getAllCharacters().length,
            materials: getAllMaterials().length,
            elements: getAllElements().length,
            weapons: getAllWeapons().length
        },
        endpoints: {
            characters: "/api/characters",
            materials: "/api/materials",
            elements: "/api/elements",
            weapons: "/api/weapons"
        }
    });
});

app.use("/api/characters", charactersRouter);
app.use("/api/materials", materialsRouter);
app.use("/api/regions", regionsRouter);
app.use("/api/elements", elementsRouter);
app.use("/api/weapons", weaponsRouter);

app.listen(PORT, () => {
    console.log("Genshin API running at http://localhost:" + PORT);
});