const express = require("express");
const router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

router.post("/authenticate", (req, res, next) => {
    res.send("TODO: Authentication");
});

router.post("/register", (req, res, next) => {
    let newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    Admin.registerAdmin(newAdmin, (err, admin) => {
        if(err) {
            res.json({success: false, msg: "Failed to register admin."});
        } else {
            res.json({success: true, msg: "Successfully registered admin."});
        }
    });
});

router.post("/login", (req, res, next) => {
    res.send("TODO: Logging in");
});

module.exports = router;