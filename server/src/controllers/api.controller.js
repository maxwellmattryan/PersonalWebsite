const express = require('express');
const router = express.Router();

const knex = require('knex')({client: 'pg'});

const ProfileService = require('../services/profile.service');

router.get('/', async (req, res, next) => {
    const profiles = await knex.select().from('profile');
    console.log(profiles);

    res.send("Welcome to the API!");
});

module.exports = router;