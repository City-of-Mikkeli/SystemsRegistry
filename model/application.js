var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	description: String,
	server: mongoose.Schema.Types.ObjectId,
	contract: mongoose.Schema.Types.ObjectId,
	integrations: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Application', schema);