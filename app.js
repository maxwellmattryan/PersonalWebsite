// APP CONFIG
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// DATABASE
const config = require('./config/database');

mongoose.connect(config.database, {
    promiseLibrary: require('bluebird'),
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to ' + config.database))
.catch((err) => console.log('Database error: ' + err));

// APP CONFIG
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// TODO: Remove later once the front end is implemented (or SSR ... ?)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// ROUTES
app.use('/api',             require('./routes/index'));
app.use('/api/admin',       require('./routes/admin'));
app.use('/api/blog',        require('./routes/blog'));
app.use('/api/profiles',    require('./routes/profile'));
app.use('/api/projects',    require('./routes/project'));

// EXPORT
module.exports = app;