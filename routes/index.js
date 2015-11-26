var application = require('./application');
var server = require('./server');

module.exports = function(app, root){
	
	// Navigation
	app.get(root, function(req, res){
		res.render('index', {root: root});
	});
	
	// API
	app.post(root+'api/application', application.create);
	app.put(root+'api/application/:id', application.update);
	app.get(root+'api/application', application.list);
	app.get(root+'api/application/:id', application.get);
	app.delete(root+'api/application/:id', application.remove);
	
	app.post(root+'api/server', server.create);
	app.put(root+'api/server/:id', server.update);
	app.get(root+'api/server', server.list);
	app.get(root+'api/server/:id', server.get);
	app.delete(root+'api/server/:id', server.remove);
	
	// Ajax-templates
	app.get(root+'template/application', function(req, res){
		res.render('new-application-form', {root: root});
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