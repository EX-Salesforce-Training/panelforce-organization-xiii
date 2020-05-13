({
    doInit: function(component, event, helper) {
        // this function call on the component load first time     
        // get the page Number if it's not define, take 1 as default
        var page = component.get("v.page") || 1;
        // get the select option (drop-down) values.   
        var recordToDisply = component.find("recordSize").get("v.value");
        // call the helper function   
        console.log("Page: " + page + "RecordNum: " + recordToDisply)
        helper.getTopics(component, page, recordToDisply);
        
        helper.removeCSS(component,event);
        helper.applyCSS(component,event,recordToDisply);
        
        $A.enqueueAction(component.get("{!c.addInputField}"));
   
     },
    addTopicHandler: function(component,event,helper){

        var topicList = event.getParam("topics");

        component.set("v.technologyList",topicList);
        
    },

    submitButtonOnClick: function(component,event,helper){
		
        var topicObjList = component.get("v.topicObjList");

        var topics = "";
        var maxscore = "";

        for(var i=0;i<topicObjList.length;i++){
            if(topicObjList[i].Name.get("v.value").trim() != "" && topicObjList[i].Max_Score__c.get("v.value").trim() != ""){
                
                topics += ("," + topicObjList[i].Name.get("v.value").trim());
                maxscore += ("," + topicObjList[i].Max_Score__c.get("v.value").trim());
                
            }
            
        }
        
        topics = topics.substr(1);
        maxscore = maxscore.substr(1);
        
        console.log(topics);

        var newCurriculum = component.get("v.cur");
        newCurriculum.Topics__c = topics;
        newCurriculum.Max_Scores__c = maxscore;
        
        var action = component.get("c.createCurriculum");
        action.setParams({
            "cur": newCurriculum
        });
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                //component.set("v.technologyList", response.getReturnValue()); 
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "success",
                    "message": "The curriculum has been saved."
                    
                });
                toastEvent.fire();              
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
    },
    addInputField : function(component, event , helper){

        var mainTopicList=component.get("v.mainTopicList");
        var topicObjList = component.get("v.topicObjList");
        
        var action = component.get("c.createTopic");

        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
            	topicObjList.push(response.getReturnValue());    
                
                $A.createComponent("lightning:input",
                {"aura:id":"topicName", 
                "label":"Topic Name",
                "class": "input1 slds-align_absolute-center slds-col slds-size_1-of-2",
                "value": topicObjList[topicObjList.length-1].Name},
                function(newInput, status, errorMessage){
                    if(status === "SUCCESS"){
                        var body = component.get("v.body");
                        body.push(newInput);
                        component.set("v.body", body);
        
                        mainTopicList.push(newInput);
                        topicObjList[topicObjList.length-1].Name= newInput;
                        console.log(newInput.get("v.value"));
                    }
                } );
        
                $A.createComponent("lightning:input",
                {"aura:id":"maxScore", 
                "label":"Max Score",
                "class": "slds-align_absolute-center slds-col slds-size_1-of-2" ,
                 "value": topicObjList[topicObjList.length-1].Max_Score__c},
                function(newInput, status, errorMessage){
                    if(status === "SUCCESS"){
                        var body = component.get("v.body");
                        body.push(newInput);
                        component.set("v.body", body);
                        
                        mainTopicList.push(newInput);
                        topicObjList[topicObjList.length-1].Max_Score__c = newInput;
                    }
                } );
        
                var page = component.get("v.page") || 1;
                // get the select option (drop-down) values.   
                var recordToDisply = component.find("recordSize").get("v.value");
                component.set("v.mainTopicList",mainTopicList);
                helper.getTopics(component,page,recordToDisply);
              
                
                component.set("v.topicObjList",topicObjList);
            }
            else{
                console.log("Error " + response.getState());
            }
        });
        $A.enqueueAction(action);
  

        
    },

    removeInputField : function(component, event, helper){
        
        var topicNames = component.find("topicName");
        var topicMaxScores = component.find("maxScore");
        var mainTopicList=component.get("v.mainTopicList");
        var topicObjList = component.get("v.topicObjList");
        var filterList = component.get("v.filterList");
        var topicNames = component.find("topicName");
        var topicMaxScores = component.find("maxScore");
       
        var body = component.get("v.body");
        
        var page = component.get("v.page") || 1;
      	// get the select option (drop-down) values.   
      	var recordToDisply = component.find("recordSize").get("v.value");
        
        
		//topicNames[topicNames.length-1].set("v.value","");
        //topicMaxScores[topicMaxScores.length-1].set("v.value","");  

        console.log("Before " +body);
        
		topicObjList.pop();
        //topicObjList.pop();
        mainTopicList.pop();
        mainTopicList.pop();
        
        //filterList.pop();
        //filterList.pop();

        
		body.pop();
        body.pop();
        
		component.set("v.mainTopicList",mainTopicList);
        component.set("v.topicObjList", topicObjList);
        component.set("v.body", body);

		console.log("THIS VALUES " + topicObjList.length);
        for(var i=0;i<topicObjList.length;i++){
            console.log(topicObjList[i].Name.get("v.value") + " AND " + topicObjList[i].Max_Score__c.get("v.value"));
        }
        
        helper.getTopics(component,page,recordToDisply);
    },

    navigate: function(component, event, helper) {
        // this function call on click on the previous page button  
        var page = component.get("v.page") || 1;
        // get the previous button label  
        var direction = event.getSource().get("v.label");
        // get the select option (drop-down) values.  
        var recordToDisply = component.find("recordSize").get("v.value");
        // set the current page,(using ternary operator.)  
        page = direction === "Previous Page" ? (page - 1) : (page + 1);
        // call the helper function
        helper.getTopics(component, page, recordToDisply);
   
     },
      onSelectChange: function(component, event, helper) {
        // this function call on the select opetion change,	 
        var page = 1
        var recordToDisply = component.find("recordSize").get("v.value");
        helper.getTopics(component, page, recordToDisply);
          
        helper.removeCSS(component,event); 
        helper.applyCSS(component,event,recordToDisply);
     },
    onChange:function(event){
        console.log(event.target.value);
    }
})