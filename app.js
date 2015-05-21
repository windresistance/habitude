/* Dependencies */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

/* MongoDB */
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/habitude';
var options = { server: { socketOptions: { keepAlive: 1 } } };

mongoose.connect(uristring, options);
var Task = require('./models/task');

/* Express */
var app = express();

/* Use EJS engine */
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

/* Serve static files */
app.use(express.static('public/dist'));
app.use(require('morgan')('dev'));

app.use(parseUrlencoded);

/* Routes */
app.use('/tasks', require('./routes/tasks'));

/* Start server */
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Express server running Habitude on port 3000!');
});