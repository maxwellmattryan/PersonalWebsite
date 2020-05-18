const passport = require("passport");

// APP INIT
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const blog = require("./routes/blog");
app.use("/blog", blog);

// DATABASE INIT
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
});
mongoose.connection.on("error", (err) => {
    console.log("Database error: " + err);
});

// START SERVER
const port = 3000;

app.listen(port, () => {
    console.log("Server started on port " + port);
});