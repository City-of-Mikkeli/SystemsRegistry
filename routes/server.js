var Server = require('../model/server');
var Application = require('../model/application');
var async = require('async');
var _ = require('underscore');


exports.create = function(req, res){
	var name = req.body.name;
	var description = req.body.description;
	var contract = req.body.contract;
	var applications = req.body.applications;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required');
	}else{
		var server = new Server();
		server.name = name;
		server.description = description;
		server.contract = contract || null;
		server.applications = applications || [];
		server.save(function(err, server){
			if(err){
				res.status(500).send(err);
			}else{
				async.each(server.applications, function(app, cb){
					Application.findById(app, function(err, application){
						if(err) {
							cb(err);
						}else{
							if(!application){
								cb('Application with id: '+app+' not found');
							}else{
								application.server = server._id;
								application.save(function(err, application){
									if(err){
										cb(err);
									}else{
										cb();
									}
								});
							}
						}
					});
				}, function(err){
					if(err){
						server.remove();
						res.status(500).send(err);
					}else{
						res.send(server);
					}
				});
			}
		});
	}	
};

exports.update = function(req, res){
	var _id = req.params.id;
	var name = req.body.name;
	var description = req.body.description;
	var contract = req.body.contract;
	var applications = req.body.applications;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required');
	}else{
		Server.findById(_id, function(err, server){
			if(err){
				res.status(500).send(err);
			}else{
				if(!server){
					res.status(404).send('Cannot find server with that id.')
				}else{
					server.name = name;
					server.description = description;
					server.contract = contract || null;
					server.applications = applications || [];
					server.save(function(err, server){
						if(err){
							res.status(500).send(err);
						}else{
							res.send(server);
						}
					})
				}
			}
		});
	}
};

exports.get = function(req, res){
	var _id = req.params.id;
	Server.findById(_id, function(err, server){
		if(err){
			res.status(500).send(err);
		}else if(!server){
			res.status(404).send('Cannot find server with that id.');
		}else{
			res.send(server);
		}
	});
};

exports.list = function(req, res){
	Server.find({}, function(err, servers){
		if(err){
			res.status(500).send(err);
		}else{
			res.send(servers);
		}
	});
};

exports.remove = function(req, res){
	var _id = req.params.id;
	Server.findByIdAndRemove(_id, function(err){
		if(err){
			res.status(500).send(err);
		}else{
			res.send();
		}
	})
};