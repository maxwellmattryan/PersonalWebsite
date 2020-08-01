const knex = require('knex')({client: 'pg'});

const getActiveProfile = () => {
    knex.select().from('profile');
}

module.exports = {
    getActiveProfile
};