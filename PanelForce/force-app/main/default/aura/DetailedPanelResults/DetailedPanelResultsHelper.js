({
    getPanel : function(component, event, helper,info){
        
        var action = component.get('c.GetPanel');
        action.setParams({Id : info});
        action.setCallback(this, $A.getCallback(function (response){ 
            var state = response.getState();
            
            if (state === "SUCCESS"){
                component.set('v.PanelInfo', response.getReturnValue());
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    },
    
    getTopics: function(component,event, helper,info){
        
        var action = component.get('c.GetTopics');
        action.setParams({Id : info});
        action.setCallback(this, $A.getCallback(function (response){ 
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set('v.TopicsRecorded', response.getReturnValue());
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    }
})