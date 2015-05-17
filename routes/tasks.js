/* Dependencies */
var express = require('express');
var router = express.Router();

var tasks = require('../controllers/tasks');

/* Routes */
router.route('/')
	// get all tasks
	.get(function(req, res) {
		tasks.index_json(req, res);
	})

	// add new task
	.post(function(req, res) {
		tasks.create(req, res);
	});

router.route('/:id')
	// get task
	.get(function(req, res) {
		tasks.show(req, res);
	})

	// delete task
	.delete(function(req, res) {
		tasks.destroy(req, res);
	})

	// edit task
	.put(function(req, res) {
		tasks.update(req, res);
	});

module.exports = router;