({
    getPanel : function(component, event, helper,info) {
        var action = component.get('c.GetPanel');
        console.log(info);
        action.setParams({Name : info});
        action.setCallback(this, $A.getCallback(function (response){ 
            var state = response.getState();
            console.log(state);  
            if (state === "SUCCESS"){
                component.set('v.PanelInfo', response.getReturnValue());
                console.log(component.get('v.PanelInfo'));
                $A.get('e.force:refreshView').fire();
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    },
    
    getTopics: function(component,event, helper,info) {
        var action = component.get('c.GetTopics');
        action.setParams({Name : info});
        action.setCallback(this, $A.getCallback(function (response){ 
            var state = response.getState();
            console.log(state);  
            if (state === "SUCCESS"){
                component.set('v.TopicsRecorded', response.getReturnValue());
                console.log(response.getReturnValue());
                console.log(component.get('v.TopicsRecorded'));
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    }
})