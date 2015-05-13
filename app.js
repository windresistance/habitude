/* Dependencies */
var express = require('express');
var mongoose = require('mongoose');

/* MongoDB */
mongoose.connect('mongodb://localhost/habitude');
var Task = require('./models/task');

/* Express */
var app = express();

/* Use EJS engine */
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

/* Serve static files */
app.use(express.static('public'));

/* Routes */
app.use('/tasks', require('./routes/tasks'));

/* Start server */
app.listen(3000, function() {
	console.log('Express server running Habitude on port 3000!');
});