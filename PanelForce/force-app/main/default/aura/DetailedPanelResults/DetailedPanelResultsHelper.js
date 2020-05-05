({
    getPanel : function(component, event, helper) {
        var action = component.get('c.GetPanel');
        action.setParams({Name : 'Panel - 0'});
        action.setCallback(this, $A.getCallback(function (response){ 
            var state = response.getState();
            console.log(state);  
            if (state === "SUCCESS"){
                component.set('v.PanelInfo', response.getReturnValue());
                console.log(component.get('v.PanelInfo'));
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    },
    
    getTopics: function(component,event, helper) {
        var action = component.get('c.GetTopics');
        action.setParams({Name : 'Panel - 0'});
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