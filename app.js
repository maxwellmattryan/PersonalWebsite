// APP CONFIG
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const ejs = require("ejs");
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// DATABASE
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mattmaxwell", {
    promiseLibrary: require("bluebird"),
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connection successful !"))
.catch((err) => console.log(err));

// ROUTES
const indexRoute = require("./routes/index");
const blogRoute = require("./routes/blog");

app.use("/", indexRoute);
app.use("/blog/", blogRoute);

// EXPORT
module.exports = app;