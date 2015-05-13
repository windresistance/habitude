/* Dependencies */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

var tasks = require('../controllers/tasks');

/* Routes */
router.route('/')
	// get all tasks
	.get(function(req, res) {
		tasks.index_json(req, res);
	})

	// add new task
	.post(parseUrlencoded, function(req, res) {
		tasks.create(req, res);
	});

router.route('/:_id')
	// get task
	.get(parseUrlencoded, function(req, res) {
		tasks.show(req, res);
	})

	// delete task
	.delete(function(req, res) {
		tasks.destroy(req, res);
	});

module.exports = router;