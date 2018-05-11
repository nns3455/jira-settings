$(document).ready(function(){
	chrome.storage.sync.get({
		jira_helper_options: {}
	}, function(items) {
		var options = items["jira_helper_options"];
		
		$.each(options, function(id, value) {
			if (id == "open-pdf-in-browser-enabled") {
				chrome.runtime.sendMessage({"open-pdf-in-browser" : value}, function(response) {
					if (response !== undefined && response["success"] !== true) {
						console.log("Failed to set option for Open PDF in Browser");
					} else {
						console.log("Successfully set option for Open PDF in Browser");
					}
				});
			} else if (id.includes("enabled") && value) {
				chrome.runtime.sendMessage({"jh-content-script" : id.replace("-enabled", "")}, function(response) {
					if (response !== undefined && response["success"] !== true) {
						console.log("Failed loading " + id.replace("-enabled", "") + " script for JIRA-Helper");
					} else {
						console.log("Successfully loaded " + id.replace("-enabled", "") + " script for JIRA-Helper");
					}
				});
			}
		});
	});
});