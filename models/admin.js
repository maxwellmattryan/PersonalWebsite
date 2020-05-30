const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true  }, 
    password: { type: String, required: true                }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

module.exports.comparePassword = (candidate, hash, callback) => {
    bcrypt.compare(candidate, hash, (err, isMatch) => {
        if(err) throw err;
        
        callback(null, isMatch);
    });
};

module.exports.getFromUsername = (username, callback) => {
    Admin.findOne({username: username}, callback);
};

module.exports.registerAdmin = (admin, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if(err) throw err;

            admin.password = hash;
            admin.save(callback);
        });
    });
};