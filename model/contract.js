var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	starts: Date,
	ends: Date,
	description: String,
	applications: [mongoose.Schema.Types.ObjectId],
	servers: [mongoose.Schema.Types.ObjectId]
	
});

module.exports = mongoose.model('Contract', schema);