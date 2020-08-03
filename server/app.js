// Initialize express app
const express = require('express');
const app = express();

// Configure body parsing for json
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Cross-Origin Resource Sharing (CORS) for server
const cors = require('cors');
app.use(cors());

// Configure logger library
const logger = require('morgan');
app.use(logger('dev'));

// Establish public directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// // Initialize passport 
// const passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());

// Construct connection string and connect with new PostgreSQL client
const dbc = require('./config/database');
const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        host: dbc.HOST,
        user: dbc.USER,
        password: dbc.PASSWORD,
        database: dbc.DB
    },
    pool: dbc.pool
});

// Establish controller routing
app.use('/api', require('./src/controllers/api.controller'));

// Create server and spin it up
const server = require('http').createServer(app);
const SERVER_PORT = 3000;
server.listen(SERVER_PORT)
.on('listening', () => {
    console.log(`App listening on http://localhost:${SERVER_PORT}`);
})
.on('error', (err) => {
    console.log(`Error: ${err}`);
});