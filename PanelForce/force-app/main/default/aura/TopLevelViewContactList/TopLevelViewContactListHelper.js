({
	/* Initialize with All Contacts */
    getData : function(component){
        
        var action = component.get('c.GetContacts');
        
        action.setCallback(this, $A.getCallback(function (response){
            
            var state = response.getState();
            
            if (state === "SUCCESS"){
                var contacts = response.getReturnValue();
                
                component.set('v.contactList', contacts);
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                console.error(errors);
            }
        }));
        
        $A.enqueueAction(action);
    }
})