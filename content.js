
$(document).ready(function(){
	var $rows = $('#customfieldmodule .property-list > .item:has(.flooded)');
	var $labels = $('.issueaction-workflow-transition .trigger-label');

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
	
	$labels.each(function(){
		var $this = $(this);
		
		switch($this.html()){
			case 'Analysis':
				$this.html('Analyzing');
				break;
			case 'Analysis - 1':
				$this.html('Analyzed');
				break;
			case 'Analysis - 2':
				$this.html('Approving');
				break;
			case 'In Progress':
				$this.html('Developing');
				break;
			case 'In Progress - 1':
				$this.html('Developed');
				break;
			case 'In Testing':
				$this.html('Testing');
				break;
			case 'In Testing - 1':
				$this.html('Tested');
				break;
			case 'In Testing - 2':
				$this.html('Demoing');
				break;
			case 'In Testing - 3':
				$this.html('Deploying');
				break;
		}
	});
});