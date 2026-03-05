const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

dotenv.config();

const siteRoute = require("./routes/sites");
const regionRoute = require("./routes/regions");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("db ok"))
    .catch((err) => console.log(err));

app.use("/api/sites", siteRoute);
app.use("/api/regions", regionRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("is running on ${PORT}")
})
