const cors          = require("cors");
const bodyParser    = require("body-parser");
const express       = require("express");
const mongoose      = require("mongoose");
const path          = require("path");
const passport      = require("passport");

// Initialization
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Start server
const port = 3000;

app.listen(port, () => {
    console.log("Server started on port " + port);
});