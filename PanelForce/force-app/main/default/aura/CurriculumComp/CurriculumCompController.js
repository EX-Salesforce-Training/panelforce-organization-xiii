({
    
    addTopicHandler: function(component,event,helper){

        var topicList = event.getParam("topics");
        var topicString = "";

        var curriculum = component.get("v.cur");
        curriculum.Name = component.get("v.technologyInput");


        for(var tp of topicList){
            topicString.concat(tp.Name + ",");
        }


        curriculum.Topics__c = topicString;

        var action = component.get("c.createCurriculum");
        action.setParams({
            "cur": curriculum
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
        // We store the value from the event inside the attribute of Bob.
        //component.set("v.Bob", message);
    }
})