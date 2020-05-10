({ //Load the specific panel to be displayed.
    recordLoaded : function(component, event, helper) {
        //access panel Id from the component view and the getTopics function in Apex controller 
        var action = component.get("c.getTopics");
        var id = component.get("v.id");
        //Pass unique panel Id into getTopics method in Apex Controller.
        action.setParams({
            "panelID": id
        });
        //Usual Callback stuff. Update topics in the component view. 
        action.setCallback(this, function(response){

            if(response.getState() === "SUCCESS"){

                var topics = response.getReturnValue();
                
                //console.log(topics);
                component.set("v.topics",topics);
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
    },
    //Update and save the modified panel and related topic records. 
    handleSaveRecord :function(component,event,helper){  
        
        //Show a toast to inform the user that everything is saved correctly. 
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type" : "success",
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();

        //Prime the updatePanelTopics method in the Apex controller. 
        //Acquire the attributes from the component view. 
        var action = component.get("c.updatePanelTopics");
        var panelID = component.get("v.id");
        var topics = component.get("v.topics");

        /*
        for(var i = 0;i<topics.length;i++){
            console.log(topics[i]);
        }*/

        //Pass panel Id and its associated topics into Apex controller method. 
        action.setParams({
            "panelId": panelID,
            "topics" : topics
        });
        //Usual callback stuff. 
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
        //Fire event to return to home page. 
        let navigateHome = component.getEvent("NavigateToHomePage");
        navigateHome.fire();

        var appEvent = $A.get("e.c:RefreshDetailedPanelPage");
        appEvent.fire();

    }

});

