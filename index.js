const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');
const siteRoute = require("./routes/sites");
const regionRoute = require("./routes/regions");

const app = express();

app.get("/api/mapbox-events", async (req, res) => {
    const url = `https://events.mapbox.com/events/v2?access_token=${process.env.REACT_APP_MAPBOX}`;
    console.log('wyf', url)
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URL}test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("db ok");
    })
    .catch((err) => console.log(err));

app.use("/api/sites", siteRoute);
app.use("/api/regions", regionRoute);

app.listen(8000, () => {
    console.log("is running....")
})

app.use(express.static(path.join(__dirname, 'public')));
