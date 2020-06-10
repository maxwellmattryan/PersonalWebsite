const express = require('express');
const router = express.Router();

const config = require('../config/database');
const jwt = require('jsonwebtoken');

const passport = require('passport');
require('../config/passport')(passport);

const Admin = require('../models/admin');

router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.getFromUsername(username, (err, admin) => {
        if(err) throw err;

        if(!admin) {
            return res.json({success: false, msg: 'Unable to find admin.'});
        }

        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(admin.toJSON(), config.secret, {
                    expiresIn: "12h"
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    msg: 'Successfully logged in!',
                    admin: {
                        id: admin._id,
                        username: admin.username
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password.'});
            }
        });
    });
});

// CAUTION: This endpoint should always be inactive
router.post('/register', (req, res, next) => {
    let newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    Admin.registerAdmin(newAdmin, (err, admin) => {
        if(err) {
            res.json({success: false, msg: 'Unable to register admin.'});
        } else {
            res.json({success: true, msg: 'Successfully registered admin!'});
        }
    });
});

module.exports = router;