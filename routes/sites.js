const router = require("express").Router();
const Site = require("../models/site.model");


router.post("/", async (req, res) => {
  const newSite = new Site(req.body);
  try {
    const savedSite = await newSite.save();
    res.status(200).json(savedSite);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const sites = await Site.find()
    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).populate("region");
    if (!site) res.status(404).json({ message: 'Not found' });
    const sites = await Site.find({ region: site.region._id });
    res.json({ site, sites });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, lat, long, type, images, region, desc } = req.body;

  if (!name || !lat || !long || !type || !region) {
    return res.status(400).json({
      message: "Missing fields"
    });
  }

  try {
    const site = await Site.findById(req.params.id);

    const updatedSite = await Site.findByIdAndUpdate(
      id,
      { name, lat, long, type, images, desc, region },
      { new: true, runValidators: true }
    );

    if (!updatedSite) {
      return res.status(404).json({ message: "Site nie znaleziony." });
    }

    res.status(200).json(updatedSite);

  } catch (err) {
    console.error("UPDATE ERROR:", err)
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).reduce((acc, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {});
      return res.status(400).json({ message: "Validation Error", errors });
    }

    res.status(500).json({ message: "Błąd serwera", error: err });
  }
});


router.get("/coordinates", async (req, res) => {
  try {
    const currentUser = await req.query.username;
    let lats;
    let longs;
    if (currentUser !== "") {
      lats = await Site.find({ username: currentUser }).distinct("lat");
      longs = await Site.find({ username: currentUser }).distinct("long");
    } else {
      lats = await Site.find().distinct("lat");
      longs = await Site.find().distinct("long");
    }

    const lats_coord = [Math.min(...lats), Math.max(...lats)]
    const longs_coord = [Math.min(...longs), Math.max(...longs)]
    res.status(200).json([lats_coord, longs_coord]);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;