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
			var checkbox = document.getElementById(x.Name);

			if(checkbox.checked){
				selectedTopics.push(x);
			}
		  }
		
		cmpEvent.setParams({"topics" : selectedTopics});

		cmpEvent.fire();
	}
})