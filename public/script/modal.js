(function($){
	'use strict';
	
	function getFormHtml(itemType, cb){
		$.ajax({
			url: SERVER_ROOT+'template/'+itemType,
			dataType: 'html',
			success: cb
		});
	}
	
	$('#new-item-modal.modal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget);
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
	  }, this));
	});

	
})($);