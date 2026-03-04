const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    desc: {
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
    images: {
        type: [String],
        default: []
    },
    type: {
        type: String,
        required: true
    },
    region: {
        type: String,
        ref: "Region"
    }
}
);

module.exports = mongoose.model("Site", siteSchema);