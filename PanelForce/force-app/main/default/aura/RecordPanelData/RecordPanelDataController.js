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
    
    handleChange : function(component, event, helper) {
		
        console.log(event.getParam('value'));
        if(event.getParam('value')=="checked"){
            component.find("comments").set("v.required",true);
        
        }else{
            component.find("comments").set("v.required",false);
        
        }
	},
    //Update and save the modified panel and related topic records. 
    handleSaveRecord :function(component,event,helper){  
        
        //Prime the updatePanelTopics method in the Apex controller. 
        //Acquire the attributes from the component view. 
        var action = component.get("c.updatePanelTopics");
        var panelID = component.get("v.id");
        var topics = component.get("v.topics");
        var panelObj = component.get("v.thePanel");
        /*
        for(var i = 0;i<topics.length;i++){
            console.log(topics[i]);
        }*/

        //Pass panel Id and its associated topics into Apex controller method. 
        action.setParams({
            "panelId": panelID,
            "topics" : topics,
            "panelObj": panelObj
        });
        //Usual callback stuff. 
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                //Show a toast to inform the user that everything is saved correctly. 
                //
                if(response.getReturnValue()==true){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "success",
                        "title": "Success!",
                        "message": "The record has been updated successfully."
                    });
                    toastEvent.fire();
                    
                    //Fire event to return to home page. 
                    let navigateHome = component.getEvent("NavigateToHomePage");
                    navigateHome.fire();
            
                    var appEvent = $A.get("e.c:RefreshDetailedPanelPage");
                    appEvent.fire();
                }else{
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "error",
                        "title": "Error!",
                        "message": "Must Fill In Panel Comments For Repaneled Topic"
                    });
                    toastEvent.fire();
                }
                
            }
            else{
                console.log("Error " + response.getState());
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "error",
                    "title": "Error!",
                    "message": response.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
        

    }

});