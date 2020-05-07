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

		console.log(selectedTopics.length);
		cmpEvent.setParams({"topics" : selectedTopics});
		cmpEvent.fire();
	},
	addInputField : function(component, event , helper){
		/*
		$A.createComponent("lightning:input",
		{"aura:id":"topicName", 
		"label":"Topic Name" },
		function(newInput, status, errorMessage){
			if(status === "SUCCESS"){
				var body = component.get("v.body");
				body.push(newInput);
				component.set("v.body", body);
			}
		} );
		*/
		$A.createComponents([["lightning:layoutItem"],
		["lightning:input",
		{"aura:id":"topicName", 
		"label":"Topic Name" }]], 
		function(components,status, errorMessage){
			if (status === "SUCCESS"){
				var nameLayout = components[0];
				nameLayout.set("v.body",components[1]);
				var body = component.get("v.body");
				body.push(components);
				component.set("v.body", body);
			}
		});
		$A.createComponents([["lightning:layoutItem"],
		["lightning:input",
		{"aura:id":"maxScore", 
		"label":"Max Score" }]], 
		function(components,status, errorMessage){
			if (status === "SUCCESS"){
				var nameLayout = components[0];
				nameLayout.set("v.body",components[1]);
				var body = component.get("v.body");
				body.push(components);
				component.set("v.body", body);

			}
		});
	}
})