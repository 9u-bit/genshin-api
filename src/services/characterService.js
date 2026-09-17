const fs = require("fs");
const path = require("path");

const charactersDirectory = path.join(__dirname, "../data/characters");

function getAllCharacters() {
    return fs
        .readdirSync(charactersDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(
                charactersDirectory,
                file
            );

            return JSON.parse(
                fs.readFileSync(filePath, "utf-8")
            );
        });
}

function getCharacterById(id) {
    const characters = getAllCharacters();

    return characters.find(
        (character) =>
            character.id.toLowerCase() === id.toLowerCase()
    );
}

module.exports = {
    getAllCharacters,
    getCharacterById
};