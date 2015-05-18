var mongoose = require('mongoose');
var task = mongoose.model('Task');

module.exports = {
	// retrieve all tasks
	index_json: function(req, res) {
		// task.find(function(err, results) {
		task.find().sort({ index: 1 }).exec(function(err, results) {
			if (err) res.json(err.message);
			else res.json(results);
		});
	},

	// create task
	create: function(req, res) {
		var newTask = new task(req.body);
		newTask.save(function(err) {
			if (err) res.json(err.message);
			else res.json(newTask);
		});
	},

	// show one task
	show: function(req, res) {
		task.find({ _id: req.params.id }, function(err, results) {
			if (err) res.json(err.message);
			else res.json(results);
		});
	},

	// delete task
	destroy: function(req, res) {
		task.remove({ _id: req.params.id }, function(err) {
			if (err) res.json(err.message);
			else res.json(req.params.id);
		});
	},

	// edit task
	update: function(req, res) {
		task.update({ _id: req.params.id }, { $set: req.body }, function(err) {
			if (err) req.json(err.message);
			else res.json(req.params.id);
		});
	}
}
