// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var taskSchema = new mongoose.Schema({
	listId: Number,  // for ordering tasks in a list
	name: String,
	points: Number
});

// Return model
module.exports = restful.model('Task', taskSchema);