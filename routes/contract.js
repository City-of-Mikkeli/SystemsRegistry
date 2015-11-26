var Contract = require('../model/contract');
var _ = require('underscore');

exports.create = function(req, res){
	var name = req.body.name;
	var starts = _.isDate(req.body.starts) ? req.body.starts : null;
	var ends = _.isDate(req.body.ends) ? req.body.ends : null;
	var description = req.body.description;
	var applications = req.body.applications;
	var servers = req.body.servers;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required.')
	}else{
		var contract = new Contract();
		contract.name = name;
		contract.starts = starts;
		contract.ends = ends;
		contract.description = description;
		contract.applications = applications || [];
		contract.servers = servers || [];
		contract.save(function(err, contract){
			if(err){
				res.status(500).send(err);
			}else{
				res.send(contract);
			}
		});
	}
};

exports.update = function(req, res){
	var _id = req.params.id;
	var name = req.body.name;
	var starts = _.isDate(req.body.starts) ? req.body.starts : null;
	var ends = _.isDate(req.body.ends) ? req.body.ends : null;
	var description = req.body.description;
	var applications = req.body.applications;
	var servers = req.body.servers;
	if(_.isEmpty(name) || _.isEmpty(description)){
		res.status(400).send('Name and description are required.')
	}else{
		Contract.findById(_id, function(err, contract){
			if(err){
				res.status(500).send(err);
			}else{
				if(!contract){
					res.status(404).send('Contract not found with that id.');
				}else{	
					contract.name = name;
					contract.starts = starts;
					contract.ends = ends;
					contract.description = description;
					contract.applications = applications || [];
					contract.servers = servers || [];
					contract.save(function(err, contract){
						if(err){
							res.status(500).send(err);
						}else{
							res.send(contract);
						}
					});
				}
			}
		});
	}
};

exports.get = function(req, res){
	var _id = req.params.id;
	Contract.findById(_id, function(err, contract){
		if(err){
			res.status(500).send(contract);
		}else{
			if(!contract){
				res.status(404).send('Contract not found with that id.');
			}else{
				res.send(contract);
			}
		}
	});
};

exports.list = function(req, res){
	Contract.find({}, function(err, contracts){
		if(err){
			res.status(500).send(err);
		}else{
			res.send(contracts);
		}
	});
};

exports.remove = function(req, res){
	var _id = req.params.id;
	Contract.findByIdAndRemove(_id, function(err){
		if(err){
			res.status(500).send(err);
		}else{
			res.send();
		}
	})
};