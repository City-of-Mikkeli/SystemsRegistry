module.exports = function(app, root){
	
	// Navigation
	app.get(root, function(req, res){
		res.render('index', {root: root});
	});
	
	// API
	
	// Ajax-templates
	app.get(root+'template/application', function(req, res){
		res.render('new-application-form', {root: root});
	});
};