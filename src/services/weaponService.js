const fs = require("fs");
const path = require("path");
const weaponsDirectory = path.join(__dirname, "../data/weapons");

function getAllWeapons() {
    return fs
        .readdirSync(weaponsDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const filePath = path.join(
                weaponsDirectory,
                file
            );

            return JSON.parse(
                fs.readFileSync(filePath, "utf-8")
            );
        });
}

function getWeaponById(id) {
    const weapons = getAllWeapons();

    return weapons.find(
        (weapon) =>
            weapon.id.toLowerCase() === id.toLowerCase()
    );
}

module.exports = {
    getAllWeapons,
    getWeaponById
};