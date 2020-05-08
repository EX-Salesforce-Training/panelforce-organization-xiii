({
    recordLoaded : function(component, event, helper) {
        
        var action = component.get("c.getTopics");
        var id = component.get("v.id");
 
        action.setParams({
            "panelID": "a011g00000C96YuAAJ"
        });

        action.setCallback(this, function(response){

            if(response.getState() === "SUCCESS"){

                var topics = response.getReturnValue();

                console.log(topics);
                component.set("v.topics",topics);
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
    },

    handleSaveRecord :function(component,event,helper){  
        
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();

        /////UPDATE THE TOPICS ASSOCIATED 

        var action = component.get("c.updatePanelTopics");
        var panelID = component.get("v.id");
        var topics = component.get("v.topics");


        for(var i = 0;i<topics.length;i++){
            console.log(topics[i]);
        }
        
        action.setParams({
            "panelId": "a011g00000C96YuAAJ",
            "topics" : topics
        });

        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);

    },
    
    updateTopic :function(component,event,helper){ 
        
        var topicList = component.get("v.topics");
        var cur = component.get("v.curriculumVal");
        var topicObjList = component.get("v.topicObjList");

        component.set("v.topicObjList",[]);
 
        if(cur != ""){
            console.log("THIS IS VALUE: " + cur);

            var action = component.get("c.getTopics");
            action.setParams({
                "curId": cur.toString()
            });
            action.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    var curic = response.getReturnValue();
                    
                    console.log(curic);
                    var topicNames = curic.Topics__c.split(",");
                    var topicScores = curic.Max_Scores__c.split(",");

                    //var topic = component.get("v.topic");
                    
                    console.log(topicNames + " " + topicScores);
                    for(var i=0;i<topicNames.length;i++){

                        var name = topicNames[i];
                        var score = topicScores[i];
                        topicObjList.push(name+","+score);

                    }

                    component.set("v.topicObjList",topicObjList);
                }
                else{
                    console.log("Error " + response.getState());
                }
            });
            $A.enqueueAction(action);
        }

    }

});

