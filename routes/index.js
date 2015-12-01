var applicationApi = require('./application');
var serverApi = require('./server');
var contractApi = require('./contract');
var integrationApi = require('./integration');

var Application = require('../model/application');
var Server = require('../model/server');
var Contract = require('../model/contract');
var Integration = require('../model/integration');


module.exports = function(app, root){
	
	// Navigation
	app.get(root, function(req, res){
		Server.find({}, function(err, servers){
			if(err){
				res.status(500).send(err);
			}else{
				Application.find({}, function(err, applications){
					if(err){
						res.status(500).send(err);
					}else{
						res.render('index', {root: root, servers: servers, applications: applications});
					}
				});
			}
		})
	});
	
	// API
	app.post(root+'api/application', applicationApi.create);
	app.put(root+'api/application/:id', applicationApi.update);
	app.get(root+'api/application', applicationApi.list);
	app.get(root+'api/application/:id', applicationApi.get);
	app.delete(root+'api/application/:id', applicationApi.remove);
	
	app.post(root+'api/server', serverApi.create);
	app.put(root+'api/server/:id', serverApi.update);
	app.get(root+'api/server', serverApi.list);
	app.get(root+'api/server/:id', serverApi.get);
	app.delete(root+'api/server/:id', serverApi.remove);
	
	app.post(root+'api/contract', contractApi.create);
	app.put(root+'api/contract/:id', contractApi.update);
	app.get(root+'api/contract', contractApi.list);
	app.get(root+'api/contract/:id', contractApi.get);
	app.delete(root+'api/contract/:id', contractApi.remove);
	
	app.post(root+'api/integration', integrationApi.create);
	app.put(root+'api/integration/:id', integrationApi.update);
	app.get(root+'api/integration', integrationApi.list);
	app.get(root+'api/integration/:id', integrationApi.get);
	app.delete(root+'api/integration/:id', integrationApi.remove);
	
	// Ajax view templates
	app.get(root+'application/:id', function(req, res){
		var _id = req.params.id;
		Application.findById(_id, function(err, application){
			if(err){
				res.status(500).send(err);
			}else{
				res.render('application', {root: root, application: application});
			}
		});		
	});
	
	app.get(root+'server/:id', function(req, res){
		var _id = req.params.id;
		Server.findById(_id, function(err, server){
			if(err){
				res.status(500).send(err);
			}else{
				res.render('server', {root: root, server: server});
			}
		});		
	});
	
	app.get(root+'contract/:id', function(req, res){
		var _id = req.params.id;
		Contract.findById(_id, function(err, contract){
			if(err){
				res.status(500).send(err);
			}else{
				res.render('contract', {root: root, contract: contract});
			}
		});		
	});
	
	app.get(root+'integration/:id', function(req, res){
		var _id = req.params.id;
		Integration.findById(_id, function(err, integration){
			if(err){
				res.status(500).send(err);
			}else{
				res.render('integration', {root: root, integration: integration});
			}
		});		
	});
	
	// Ajax form templates
	app.get(root+'template/application', function(req, res){
		Server.find({}, function(err, servers){
			if(err){
				res.status(500).send(err);
			}else{
				res.render('new-application-form', {root: root, servers: servers});
			}
		});
		
	});
	
	app.get(root+'template/server', function(req, res){
		res.render('new-server-form', {root: root});
	});
	
	app.get(root+'template/contract', function(req, res){
		res.render('new-contract-form', {root: root});
	});
	
	app.get(root+'template/integration', function(req, res){
		res.render('new-integration-form', {root: root});
	});
};