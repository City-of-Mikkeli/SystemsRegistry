(function($){
	'use strict';
	
	var postHandlers = {
		server: function(e){
			var form = $('.new-item-form');
			var url = form.attr('action');
			var name = $('#new-server-name').val();
			var description = $('#new-server-description').val();
			var applications = $('#new-server-applications').val();
			form.hide();
			$('.loader').show();
			$.post(url, {
				name: name,
				description: description,
				applications: applications
			}, function(server){
				window.location.href = SERVER_ROOT+'server/'+server._id;
			});
		},
		application: function(e){
			var form = $('.new-item-form');
			var url = form.attr('action');
			var name = $('#new-app-name').val();
			var description = $('#new-app-description').val();
			var server = $('#new-app-server').val();
			form.hide();
			$('.loader').show();
			$.post(url, {
				name: name,
				description: description,
				server: server
			}, function(application){
				console.log(application);
				//window.location.href = SERVER_ROOT+'application/'+application._id;
			});
		},
		contract: function(e){
			var form = $('.new-item-form');
			var url = form.attr('action');
			var name = $('#new-contract-name').val();
			var starts = $('#new-contract-starts').datepicker('getDate');
			var ends = $('#new-contract-ends').datepicker('getDate');
			var description = $('#new-contract-description').val();
			var applications = $('#new-contract-applications').val();
			var servers = $('#new-contract-servers').val();
			form.hide();
			$('.loader').show();
			$.post(url, {
				name: name,
			 	starts: starts,
			  	ends: ends,
			   	description: description,
				applications: applications,
			    servers: servers
			}, function(contract){
				console.log(contract);
				//window.location.href = SERVER_ROOT+'application/'+application._id;
			});
		},
		integration: function(e){
			
		}
	};
	
	function getFormHtml(itemType, cb){
		$.ajax({
			url: SERVER_ROOT+'template/'+itemType,
			dataType: 'html',
			success: cb
		});
	}
	
	$('#new-item-modal.modal').on('show.bs.modal', function (event) {
	  if(!$(event.target).hasClass('form-control')){ //TODO: wtf datepicker is triggering modal show function?
		  var button = $(event.relatedTarget);
		  $(this).off( 'click', '.send-modal-data');
		  $(this).find('.modal-form-container').remove();
		  $(this).find('.loader').show();
		  $(this).find('.modal-title').text(button.attr('data-modal-title'));
		  var itemType = button.attr('data-item-type');
		  getFormHtml(itemType, $.proxy(function(form){
			  var wrappedForm = $('<div>')
			    .addClass('modal-form-container')
				.append(form);
			  $(this).find('.loader').hide();
			  $(this).find('.modal-body').append(wrappedForm);
			  $(this).on( 'click', '.send-modal-data', postHandlers[itemType]);
		  }, this));
	  }
	});	
})($);