const router = require("express").Router();
const Region = require("../models/region.model");
const Site = require("../models/site.model");

router.get("/", async (req, res) => {
    try {
        const regions = await Region.find()
        res.status(200).json(regions);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const region = await Region.findById(req.params.id);
        if (!region) res.status(404).json({ message: 'Not found' });
        else {
            const sites = await Site.find({ region: req.params.id });
            region.sites = sites
            return res.json(region);
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
})

router.put("/:id", async (req, res) => {
    console.log('wtf')
    const { id } = req.params;
    const { name, lat, long, img, country, description } = req.body;

    if (!name || !lat || !long || !img || !country || !description) {
        return res.status(400).json({
            message: "Missing fields"
        });
    }

    try {
        const updatedRegion = await Region.findByIdAndUpdate(
            id,
            { name, lat, long, country, img, description, },
            { new: true, runValidators: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({ message: "Region not found." });
        }
        console.log('r', updatedRegion)
        res.status(200).json(updatedRegion);

    } catch (err) {
        console.error("UPDATE ERROR:", err)
        if (err.name === "ValidationError") {
            const errors = Object.keys(err.errors).reduce((acc, key) => {
                acc[key] = err.errors[key].message;
                return acc;
            }, {});
            return res.status(400).json({ message: "Validation Error", errors });
        }
    }
})

module.exports = router;
