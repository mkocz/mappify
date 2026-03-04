const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');
const siteRoute = require("./routes/sites");
const regionRoute = require("./routes/regions");

const app = express();

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
