const express = require("express");
const charactersRouter = require("./routes/characters.js");

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
        endpoints: {
            characters: "/api/characters"
        }
    });
});

app.use("/api/characters", charactersRouter);

app.listen(PORT, () => {
    console.log("Genshin API running at http://localhost:" + PORT);
});