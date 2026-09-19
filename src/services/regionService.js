const fs = require("fs");
const path = require("path");
const regionsDirectory = path.join(__dirname, "../data/regions");

function getAllRegions() {
    return fs
        .readdirSync(regionsDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(regionsDirectory, file);
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        });
}

function getRegionById(id) {
    const regions = getAllRegions();

    return regions.find(
        (region) =>
            region.id.toLowerCase() === id.toLowerCase()
    );
}

module.exports = {
    getAllRegions,
    getRegionById
};