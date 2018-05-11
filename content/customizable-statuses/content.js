var statuses = {
	'Analysis':'Analysis', 
	'Analysis - 1':'Analyzed',
	'Analysis - 2':'Approving',
	'In Progress':'Developing',
	'In Progress - 1':'Developed',
	'In Testing':'Testing',
	'In Testing - 1':'Tested',
	'In Testing - 2':'Demoing',
	'In Testing - 3':'Deploying',
	'In Testing - 4':'Closed'
};

var $buttonLabels = $('.issueaction-workflow-transition .trigger-label');
var $lozengeLabels = $('.jira-issue-status-lozenge');

fixLabels($buttonLabels, statuses);
fixLabels($lozengeLabels, statuses);

function fixLabels(labels, statuses){
	
	labels.each(function(){
		var $this = $(this);
		if(statuses[$this.html()] != null){
			$this.html(statuses[$this.html()]);
		}
	});
}