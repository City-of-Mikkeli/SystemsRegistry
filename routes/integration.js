var Integration = require('../model/integration');
var _ = require('underscore');

exports.create = function(req, res){
  var name = req.body.name;
  var description = req.body.description;
  var fromApplication = req.body.from;
  var toApplication = req.body.to;
  if(_.isEmpty(name) || _.isEmpty(description) || _.isEmpty(fromApplication) || _.isEmpty(toApplication)){
    res.status(400).send('Name, description, from and to are required.');
  }else{
    var integration = new Integration();
    integration.name = name;
    integration.description = description;
    integration.fromApplication = fromApplication;
    integration.toApplication = toApplication;
    integration.save(function(err, integration){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(integration);
      }
    });
  }
};

exports.update = function(req, res){
  var _id = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  var fromApplication = req.body.from;
  var toApplication = req.body.to;
  if(_.isEmpty(name) || _.isEmpty(description) || _.isEmpty(fromApplication) || _.isEmpty(toApplication)){
    res.status(400).send('Name, description, from and to are required.');
  }else{
    Integration.findById(_id, function(err, integration){
      if(err){
        res.status(500).send(err);
      }else{
        if(!integration){
          res.status(404).send('No integration found with that id.');
        }else{
          integration.name = name;
          integration.description = description;
          integration.fromApplication = fromApplication;
          integration.toApplication = toApplication;
          integration.save(function(err, integration){
            if(err){
              res.status(500).send(err);
            }else{
              res.send(integration);
            }
          });
        }
      }
    });
  }
}

exports.get = function(req, res){
  var _id = req.params.id;
  Integration.findById(_id, function(err, integration){
    if(err){
      res.status(500).send(err);
    }else{
      res.send(integration);
    }
  })
};

exports.list = function(req, res){
  Integration.find({}, function(err, integrations){
    if(err){
      res.status(500).send(err);
    }else{
      res.send(integrations);
    }
  }); 
}

exports.remove = function(req, res){
  Integration.findByIdAndRemove(function(err){
    if(err){
      res.status(500).send(err);
    }else{
      res.send();
    }
  }); 
}