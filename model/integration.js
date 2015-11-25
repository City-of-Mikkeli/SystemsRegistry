var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	description: String,
	fromApplication: mongoose.Schema.Types.ObjectId,
	toApplication: mongoose.Schema.Types.ObjectId 
});

module.exports = mongoose.model('Integration', schema);