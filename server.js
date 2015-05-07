// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/habitude');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log('Express server running on port 3000');