const express = require("express");
const router = express.Router();

router.post("/authenticate", (req, res, next) => {
    res.send("TODO: Authentication");
});

router.post("/register", (req, res, next) => {
    res.send("TODO: Registration");
});

router.post("/login", (req, res, next) => {
    res.send("TODO: Logging in");
});

router.post("/logout", (req, res, next) => {
    res.send("TODO: Logging out");
});

module.exports = router;