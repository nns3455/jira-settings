var openPdfInBrowser = false;

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
	if (message["jh-content-script"] != undefined){
		var scriptFile = "content/" + message["jh-content-script"] + "/content.js"
		console.log(scriptFile);
		chrome.tabs.executeScript({
			file: scriptFile
		});
		callback({"success" : true});
	}
	
	if (message["open-pdf-in-browser"] != undefined) {
		openPdfInBrowser = message["open-pdf-in-browser"];
	}
	
	
		
		
	callback({"success" : false});
});

chrome.webRequest.onHeadersReceived.addListener(
	function(info) {
		if (!openPdfInBrowser) {
			return {};
		}
		var category = 'responseHeaders';
		var contentDisposition = info.responseHeaders.find(header => header.name === "Content-Disposition");
		if (contentDisposition != undefined) {
			contentDisposition.value = contentDisposition.value.replace("attachment", "inline");
		} else {
			return {};
		}
		console.log(info);
		info.responseHeaders[info.responseHeaders.length] = { "name" : "Content-Location", "value" : "_blank" };
		return {responseHeaders: info.responseHeaders};
	},
	{
		urls: [
		  "http://*/*",
		  "https://*/*",
		]
	},
	["blocking", "responseHeaders"]
);