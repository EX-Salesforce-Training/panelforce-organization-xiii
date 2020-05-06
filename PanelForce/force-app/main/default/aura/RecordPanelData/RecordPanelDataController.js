({
    onInit : function(component, event, helper) {
        
    },

    handleSaveRecord :function(component,event,helper){  
        //var Duration = cmp.find("Duration__c").set("v.value", "My New Account");
        
        var eventfields = event.getParam('fields');
        component.find('RecordDataID').submit(eventFields);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }     
});

