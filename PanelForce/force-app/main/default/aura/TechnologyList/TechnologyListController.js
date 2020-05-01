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
		
<<<<<<< HEAD
		cmpEvent.setParams({"topics" : selectedTopics});

=======
		console.log(x.lenght);
		cmpEvent.setParams({"topics" : selectedTopics});
>>>>>>> akeemsbranch
		cmpEvent.fire();
	}
})