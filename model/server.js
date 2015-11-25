var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	description: String,
	contract: mongoose.Schema.Types.ObjectId,
	applications: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Server', schema);