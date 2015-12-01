(function($){
  'use strict';
  
  function getAppInfo(element){
    var id = $(element).text();
    $.getJSON(SERVER_ROOT+'api/application/'+id, function(app){
      $(element).text(app.name);
    });
  }
  
  function getServerInfo(element){
    var id = $(element).text();
    $.getJSON(SERVER_ROOT+'api/server/'+id, function(server){
      $(element).text(server.name);
    });
  }
  
  $(document).ready(function(){
    $('.contract-app').each(function(){
      getAppInfo(this); 
    });
    $('.contract-server').each(function(){
      getServerInfo(this);  
    });
    $('.time-field').each(function(){
      $(this).text(new Date($(this).text()).toLocaleDateString());  
    });
  });
  
})($);