const fs = require("fs");
const path = require("path");

const materialsDirectory = path.join(__dirname, "../data/materials");

function getAllMaterials() {
    return fs
        .readdirSync(materialsDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(
                materialsDirectory,
                file
            );

            return JSON.parse(
                fs.readFileSync(filePath, "utf-8")
            );
        });
}

function getMaterialById(id) {
    const materials = getAllMaterials();

    return materials.find(
        (material) =>
            material.id.toLowerCase() === id.toLowerCase()
    );
}

module.exports = {
    getAllMaterials,
    getMaterialById
};