
$(document).ready(function(){
	var $rows = $('#customfieldmodule .property-list > .item:has(.flooded)');
	
	var statuses = {
		'Analysis':'Analysis', 
		'Analysis - 1':'Analyzed',
		'Analysis - 2':'Approving',
		'In Progress':'Developing',
		'In Progress - 1':'Developed',
		'In Testing':'Testing',
		'In Testing - 1':'Tested',
		'In Testing - 2':'Demoing',
		'In Testing - 3':'Deploying'
		};
	
	var $buttonLabels = $('.issueaction-workflow-transition .trigger-label');
	var $lozengeLabels = $('.jira-issue-status-lozenge');

	fixLabels($buttonLabels, statuses);
	fixLabels($lozengeLabels, statuses);
	
	$rows.each(function() {
		var $this = $(this);
		var $name = $this.find('.name');
		var cssHtml = '';
		var styleSheets = document.styleSheets;
		
		for (var i = 0; i < styleSheets.length; i++) {
			var styleSheet = styleSheets[i];
			cssHtml += '<link rel="stylesheet" type="text/css" href="' + styleSheet.href + '">';
		}
		
		var $inner = $this.find('.value .flooded');
		$inner.css("max-height", "500px");
		$inner.css("overflow-x", "auto");
		$inner.css("overflow-y", "auto");
		
		var innerHtml = $inner.html();
		$name.prop("title", "Open in new tab");
		$this.addClass("customfieldlinkitem");
		$name.click(function() {
			var win = window.open('');
			win.document.write(innerHtml);
			win.document.write(cssHtml);
			win.document.body.style.padding = "10px";
			win.document.title = $name.text().trim().replace(':', '');
		});
		
	});
	
	function fixLabels(labels, statuses){
		
		labels.each(function(){
			var $this = $(this);
			if(statuses[$this.html()] != null){
				$this.html(statuses[$this.html()]);
			}
		});
	}
});