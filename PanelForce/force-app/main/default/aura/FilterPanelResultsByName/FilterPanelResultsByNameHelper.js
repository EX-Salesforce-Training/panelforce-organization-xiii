({
    /* Initialize with All Panels */
    getData : function(component){
        
        var action = component.get('c.GetPanels');
        
        action.setCallback(this, $A.getCallback(function (response){
            
            var state = response.getState();
            
            if (state === "SUCCESS"){
                var panelResponse = response.getReturnValue();
                
                for (let i = 0; i < panelResponse.length; i++){
                    panelResponse[i].ContactName = panelResponse[i].Contact__r.Name;
                }
                
                component.set('v.panelsList', panelResponse);
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    },
    
    /* Filter Panels by Contact Name */
    getFilteredPanelList : function(component, queryTerm){
        
        var action = component.get('c.GetContactPanels');
        action.setParams({contactName : queryTerm});
        
        action.setCallback(this, $A.getCallback(function (response){
            
            var state = response.getState();
            
            if (state === "SUCCESS"){
                var panelResponse = response.getReturnValue();
                
                for (let i = 0; i < panelResponse.length; i++){
                    panelResponse[i].ContactName = panelResponse[i].Contact__r.Name;
                }
                
                component.set('v.panelsList', panelResponse);
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    }
})