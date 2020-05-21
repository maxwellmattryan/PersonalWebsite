const express = require("express");
const router = express.Router();

const config = require("../config/database");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("../config/passport")(passport);

const Admin = require("../models/admin");

const checkAuthentication = (req, res, next) => {
    if(req.user) return next();

    return res.status(401).send("Unauthorized.");
};

router.get("/", checkAuthentication, (req, res, next) => {
    res.json({admin: req.user});
});

router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.getFromUsername(username, (err, admin) => {
        if(err) throw err;

        if(!admin) {
            return res.json({success: false, msg: "Authentication error: User not found."});
        }

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(admin.toJSON(), config.secret, {
                    expiresIn: 86400 // 1 day in seconds
                });

                res.json({
                    success: true,
                    token: "JWT " + token,
                    admin: {
                        id: admin._id,
                        username: admin.username
                    }
                });
            } else {
                return res.json({success: false, msg: "Authentication error: Invalid password."});
            }
        });
    });
});

router.get("/login", (req, res, next) => {
    res.render("admin");
});

router.get("/logout", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    res.send("TODO: Logging out");
});

// TODO: delete at some point before deploying app or making publicly available
// router.post("/register", (req, res, next) => {
//     let newAdmin = new Admin({
//         username: req.body.username,
//         password: req.body.password
//     });

//     Admin.registerAdmin(newAdmin, (err, admin) => {
//         if(err) {
//             res.json({success: false, msg: "Failed to register admin."});
//         } else {
//             res.json({success: true, msg: "Successfully registered admin."});
//         }
//     });
// });

module.exports = router;