// Dependencies
var express = require('express');
var router = express.Router();

// Model
var Task = require('../models/task');

// Routes
Task.methods(['get','put','post','delete']);
Task.register(router, '/tasks');

// GET home page
router.get('/', function(req, res, next) {
	res.render('../views/index.ejs', { title: "habitude", message: "it works!",  });
})

// Return router
module.exports = router;