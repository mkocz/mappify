const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    description: {
        type: String,
        min: 6,
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    zoom: {
        type: Number,
        default: 9
    },
    img: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        min: 3,
    },
    sites: [{ type: String, ref: "Site" }]
}
);

module.exports = mongoose.model("Region", regionSchema);