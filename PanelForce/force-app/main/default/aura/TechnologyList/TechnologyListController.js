({
	onInit : function(component, event, helper) {
		helper.findTopics(component);
	},

	addTopicEvent : function(component, event, helper){
		var cmpEvent = component.getEvent("addTopics");
		var topicList = component.get("v.technologyList");
		var selectedTopics = [];
		var x;

		for (x of topicList) {
			//console.log(x["Name"]);		
			//console.log(component.find(x["Name"]).checked);	
			var checkbox = document.getElementById(x.Name);
			console.log(checkbox.checked);
		  }
		
		cmpEvent.setParams({"topics" : topicList});
		cmpEvent.fire();
	}
})