module.exports = function(app, root){
	
	app.get(root, function(req, res){
		res.render('index', {root: root});
	});

};