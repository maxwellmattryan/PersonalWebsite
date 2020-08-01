const {
    getActiveProfile
} = require('../repositories/profile.repository');

const ProfileService = {
    get: getActiveProfile
};

module.exports = ProfileService;