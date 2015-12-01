(function($){
  'use strict';
  
  function getServerInfo(element){
    var id = $(element).text();
    $.getJSON(SERVER_ROOT+'api/server/'+id, function(server){
      $(element).text(server.name);
    });
  }
  
  function getContractInfo(element){
    var id = $(element).text();
    $.getJSON(SERVER_ROOT+'api/contract/'+id, function(contract){
      $(element).text(contract.name);
    });
  }
  
  $(document).ready(function(){
    $('.application-server').each(function(){
      getServerInfo(this);  
    });
    $('.application-contract').each(function(){
      getContractInfo(this);  
    });
  });
  
})($);