$(function() {
	restore_options();
	$('#save').click(save_options);
	
	function save_options() {
		var options = {};
		var $optionElements = $(".option");
		
		$optionElements.each(function() {
			add_element_option(this, options);
		});
		
		chrome.storage.sync.set({
			jira_helper_options: options
		}, function() {
			console.log("Saved:");
			console.log(options);
		});
	}

	function restore_options() {
		chrome.storage.sync.get({
			jira_helper_options: {}
		}, function(items) {
			var options = items["jira_helper_options"];
			
			$.each(options, function(id, value) {
				var $element = $(`[data-option-id='${id}']`);
				if ($element.is(":checkbox")) {
					$element.prop("checked", value);
				}
			});
		});
	}
		
	function add_element_option(element, options) {
		var $element = $(element);
		
		if ($element.is(":checkbox")) {
			var id = $element.data("option-id");
			options[id] = $element.is(":checked");
		}
	}
});