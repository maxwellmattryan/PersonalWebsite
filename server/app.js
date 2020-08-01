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

// Initialize passport 
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Establish controller routing
const indexController = require('./src/controllers/index.controller');

app.use('/api', indexController);

// Construct connection string and connect with new PostgreSQL client
const config = require('./config/database');
const conn = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;

const pg = require('pg');
const client = new pg.Client(conn);
client.connect()
.then(() => {
    console.log(`Connected to ${conn}\n`);
})
.catch(() => {
    console.log('Failed to connect to database.\n');
});

// Export the app
module.exports = app;