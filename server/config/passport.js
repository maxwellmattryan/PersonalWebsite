const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Admin = require("../models/admin");

const config = require("./database");

module.exports = (passport) => {
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Admin.getFromUsername(jwt_payload.username, (err, admin) => {
            if(err) return done(err, false);

            if(admin) {
                return done(null, admin);
            } else {
                return done(null, false);
            }
        });
    }));
};