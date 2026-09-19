const fs = require("fs");
const path = require("path");

const elementsDirectory = path.join(__dirname, "../data/elements");

function getAllElements() {
    return fs
        .readdirSync(elementsDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(
                elementsDirectory,
                file
            );

            return JSON.parse(
                fs.readFileSync(filePath, "utf-8")
            );
        });
}

function getElementById(id) {
    const elements = getAllElements();

    return elements.find(
        (element) =>
            element.id.toLowerCase() === id.toLowerCase()
    );
}

module.exports = {
    getAllElements,
    getElementById
};