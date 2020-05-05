({
    addTopicHandler: function(component,event,helper){

        var topicList = event.getParam("topics");

        component.set("v.technologyList",topicList);
        
    },

    submitButtonOnClick: function(component,event,helper){

        var topicNames = component.find("topicName");
        var topicMaxScores = component.find("maxScore");
        
        var topics = "";
        var maxscore = "";

        var i;

        for(i=0; i < topicNames.length; i++){
            
            if(topics === ""){
                topics += topicNames[i].get("v.value");
            }
            else{
                topics += "," + topicNames[i].get("v.value");
            }

            if(maxscore === ""){
                maxscore += topicMaxScores[i].get("v.value");
            }
            else{
                maxscore += "," + topicMaxScores[i].get("v.value");
            }
        }

        var newCurriculum = component.get("v.cur");
        newCurriculum.Topics__c = topics;
        newCurriculum.Max_Score__c = maxscore;
        
        var action = component.get("c.createCurriculum");
        action.setParams({
            "cur": newCurriculum
        });
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                //component.set("v.technologyList", response.getReturnValue());               
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
    },
    addInputField : function(component, event , helper){

        $A.createComponent("lightning:input",
		{"aura:id":"topicName", 
        "label":"Topic Name",
        "class": "input slds-col slds-size_1-of-2"},
		function(newInput, status, errorMessage){
			if(status === "SUCCESS"){
				var body = component.get("v.body");
				body.push(newInput);
                component.set("v.body", body);
			}
        } );

        $A.createComponent("lightning:input",
		{"aura:id":"maxScore", 
        "label":"Max Score",
        "class": "input slds-col slds-size_1-of-2" },
		function(newInput, status, errorMessage){
			if(status === "SUCCESS"){
				var body = component.get("v.body");
				body.push(newInput);
                component.set("v.body", body);
			}
        } );
    },

    removeInputField : function(component, event, helper){
        var body = component.get("v.body");
        body.pop();
        body.pop();
        component.set("v.body", body);
    }
})
