// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var taskSchema = new mongoose.Schema({
	name: String,
	difficulty: Number
});

// Return model
module.exports = restful.model('Tasks', taskSchema);