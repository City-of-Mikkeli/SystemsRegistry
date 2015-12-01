(function($){
	'use strict';
	
	function getAppInfo(element){
		var id = $(element).text();
		$.getJSON(SERVER_ROOT+'api/application/'+id, function(app){
			$(element).text(app.name);
		});
	}
	
	$(document).ready(function(){
		$('.server-app').each(function(){
			getAppInfo(this);	
		});
	});
	
})($);