({
	findTopics : function(component) {
		var action = component.get("c.getTopics");
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.technologyList", response.getReturnValue());
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
	}
})