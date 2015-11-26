var Application = require('../model/application');
var _ = require('underscore');

exports.create = function(req, res){
	var name = req.body.name;
	var description = req.body.description;
	var server = req.body.server;
	var contract = req.body.contract;
	var integrations = req.body.integrations;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required.');
	}else{
		var application = new Application();
		application.name = name;
		application.description = description;
		application.server = server || null;
		application.contract = contract || null;
		application.integrations = integrations || [];
		application.save(function(err, application){
			if(err){
				res.status(500).send(err);
			}else{
				res.send(application);
			}
		});
	}
	
};

exports.update = function(req, res){
	var _id = req.params.id;
	var name = req.body.name;
	var description = req.body.description;
	var server = req.body.server;
	var contract = req.body.contract;
	var integrations = req.body.integrations;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required.');
	}else{
		Application.findById(_id, function(err, application){
			if(err){
				res.status(500).send(err);
			}else{
				application.name = name;
				application.description = description;
				application.server = server || null;
				application.contract = contract || null;
				application.integrations = integrations || [];
				application.save(function(err, application){
					if(err){
						res.status(500).send(err);
					}else{
						res.send(application);
					}
				});
					
			}
		});
	}
}

exports.get = function(req, res){
	var _id = req.params.id;
	Application.findById(_id, function(err, application){
		if(err){
			res.status(500).send(err);
		}else{
			if(!application){
				res.status(404).send('no application found with that id.');
			}else{
				res.send(application);
			}
		}
	});
};

exports.list = function(req, res){
	Application.find({}, function(err, applications){
		if(err){
			res.status(500).send(err);
		}else{
			res.send(applications);
		}
	});
}

exports.remove = function(req, res){
	var _id = req.params.id;
	Application.findByIdAndRemove(_id, function(err){
		if(err){
			res.status(500).send(err);
		}else{
			res.send();
		}
	})
}