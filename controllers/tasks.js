var mongoose = require('mongoose');
var task = mongoose.model('Task');

module.exports = {
	// retrieve all tasks
	index_json: function(req, res) {
		task.find().sort({ _id: 1 }).exec(function(err, results) {
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
		task.findOne({ _id: req.params._id }, function(err, results) {
			if (err) res.json(err.message);
			else res.json(results);
		});
	},

	// delete task
	destroy: function(req, res) {
		task.remove({ _id: req.params._id }, function(err) {
			if (err) res.json(err.message);
			else res.json(req.params._id);
		});
	}
}
