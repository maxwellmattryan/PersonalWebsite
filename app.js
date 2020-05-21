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

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// TODO: Remove later once the front end is implemented (or SSR ... ?)
app.engine("html", require("ejs").renderFile);
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
const indexRoute = require("./routers/index");
const adminRoute = require("./routers/admin");
const blogRoute = require("./routers/blog");

app.use("/", indexRoute);
app.use("/admin", adminRoute);
app.use("/blog", blogRoute);

// EXPORT
module.exports = app;