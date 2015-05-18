var mongoose = require('mongoose');

// Schema
var taskSchema = new mongoose.Schema({
	listId: Number,  // for ordering tasks in a list
	name: String,
	points: Number,
	index: Number
});

mongoose.model('Task', taskSchema);