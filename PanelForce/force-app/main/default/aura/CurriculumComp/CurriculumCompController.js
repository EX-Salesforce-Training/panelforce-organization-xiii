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

        var topicNames = component.find("topicName");
        var topicMaxScores = component.find("maxScore");
        
        
        console.log(topicMaxScores);
        
        var topics = "";
        var maxscore = "";

        var i;

        for(i=0; i < topicNames.length; i++){
			console.log(topicNames[i].get("v.value"));
            console.log(topicMaxScores[i].get("v.value"));
            //console.log("SecureComponentRef: InteropComponent: markup://lightning:input{ key: {\"namespace\":\"c\"} }");
            
            if(topics == ""){
                if(topicNames[i].get("v.value")!=""){
                    if(topicNames[i].get("v.value") != "SecureComponentRef: InteropComponent: markup://lightning:input{ key: {\"namespace\":\"c\"} }"){
                        topics = topicNames[i].get("v.value");
                    }
                    
                }
            }
            else{
                if(topicNames[i].get("v.value")!=""){
                    if(topicNames[i].get("v.value") != "SecureComponentRef: InteropComponent: markup://lightning:input{ key: {\"namespace\":\"c\"} }"){
                        topics += ("," + topicNames[i].get("v.value"));
                    }
                    
                }
                
            }

            if(maxscore == ""){
                
                if(topicMaxScores[i].get("v.value")!=""){
                    if(topicMaxScores[i].get("v.value") != "SecureComponentRef: InteropComponent: markup://lightning:input{ key: {\"namespace\":\"c\"} }"){
                        maxscore = topicMaxScores[i].get("v.value");
                    }
                    
                }
            }
            else{
                 if(topicMaxScores[i].get("v.value")!=""){
                     if(topicMaxScores[i].get("v.value") != "SecureComponentRef: InteropComponent: markup://lightning:input{ key: {\"namespace\":\"c\"} }"){
                        maxscore += ("," + topicMaxScores[i].get("v.value"));
                    }
                     
                }
              
            }
        }

        var newCurriculum = component.get("v.cur");
        newCurriculum.Topics__c = topics;
        newCurriculum.Max_Scores__c = maxscore;
        
        var action = component.get("c.createCurriculum");
        action.setParams({
            "cur": newCurriculum
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
    addInputField : function(component, event , helper){
/*
        var page = component.get("v.page") || 1;
        // get the select option (drop-down) values.   
        var recordToDisply = component.find("recordSize").get("v.value");
        // call the helper function   
        console.log("Page: " + page + "RecordNum: " + recordToDisply)
        helper.getTopics(component, page, recordToDisply);
        */

        var mainTopicList=component.get("v.mainTopicList");
        var topic = component.get("v.topicObj");
        var topicObjList = component.get("v.topicObjList");
        
        topicObjList.push(topic);
        
        if(topicObjList.length!=0){
            var yup = topicObjList[0].Name;
            console.log(yup);
        }

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
<<<<<<< HEAD
        "class": "slds-align_absolute-center slds-col slds-size_1-of-2" ,
         "value": topicObjList[topicObjList.length-1].Max_Score__c},
=======
        "class": "input slds-col slds-size_1-of-2" ,
         "value": topicObjList[topicObjList.length-1].Max_Scores__c},
>>>>>>> master
		function(newInput, status, errorMessage){
			if(status === "SUCCESS"){
				var body = component.get("v.body");
				body.push(newInput);
                component.set("v.body", body);

                mainTopicList.push(newInput);
                topicObjList[topicObjList.length-1].Max_Scores__c = newInput;
			}
        } );

        var page = component.get("v.page") || 1;
      	// get the select option (drop-down) values.   
      	var recordToDisply = component.find("recordSize").get("v.value");
        component.set("v.mainTopicList",mainTopicList);
        helper.getTopics(component,page,recordToDisply);
      
        
        component.set("v.topicObjList",topicObjList);
    },

    removeInputField : function(component, event, helper){
        
        var topicNames = component.find("topicName");
        var topicMaxScores = component.find("maxScore");
        var mainTopicList=component.get("v.mainTopicList");
        var topicObjList = component.get("v.topicObjList");
        var filterList = component.get("v.filterList");
       
        var body = component.get("v.body");
        
        var page = component.get("v.page") || 1;
      	// get the select option (drop-down) values.   
      	var recordToDisply = component.find("recordSize").get("v.value");
        
        topicNames[topicNames.length-1].set("v.value","");
        topicMaxScores[topicMaxScores.length-1].set("v.value","");
  
        body.pop();
        console.log(body.pop());

        mainTopicList.pop();
        mainTopicList.pop();
        
        //filterList.pop();
        //filterList.pop();

        topicObjList.pop();
        topicObjList.pop();


        component.set("v.body", body);
        component.set("v.mainTopicList",mainTopicList);
        component.set("v.topicObjList", topicObjList);
        //component.set("v.filterList", filterList);
        //
        
        
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