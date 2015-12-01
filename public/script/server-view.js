(function($){
	'use strict';
	
	function getAppInfo(element){
		var id = $(element).text();
		$.getJSON(SERVER_ROOT+'api/application/'+id, function(app){
			$(element).text(app.name);
		});
	}
	
	function getContractInfo(element){
		var id = $(element).text();
		$.getJSON(SERVER_ROOT+'api/contract/'+id, function(contract){
			$(element).text(contract.name);
		});
	}
	
	$(document).ready(function(){
		$('.server-app').each(function(){
			getAppInfo(this);	
		});
		$('.server-contract').each(function(){
			getContractInfo(this);	
		});
	});
	
})($);