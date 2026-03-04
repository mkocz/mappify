const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const Site = require("./models/site.model.js");
const Region = require("./models/region.model.js");

async function seed() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}test`);

        const sites = JSON.parse(
            fs.readFileSync("./data/sites.json", "utf-8")
        );

        const regions = JSON.parse(
            fs.readFileSync("./data/regions.json", "utf-8")
        );

        await Site.insertMany(sites);
        await Region.insertMany(regions)

        console.log("Data imported");
        process.exit();
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
}

seed();
