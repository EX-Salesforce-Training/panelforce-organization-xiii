({
    onSubmit : function(component, event, helper) {
        event.preventDefault();
        const fields = event.getParam("fields");

        component.set("v.contact", fields.Contact__c);
        component.set("v.datetime", fields.Date_Time__c);
        component.find("form").submit(fields);
    },
    onCancel : function(component, event, helper) {
        var backEvent = component.getEvent("c:NavigateToHomePage");
        backEvent.fire();
    },
    onSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({ "title" : "Success!", "message" : "Panel submitted successfully.", "type" : "success"});
        toastEvent.fire();

        var forwardEvent = component.getEvent("c:NavigateToRecordPanelDataDateTime");
        forwardEvent.setParams({"contact" : component.get("v.contact"), "datetime" : component.get("v.datetime")});
        forwardEvent.fire();

        component.set("v.refreshForm", false);
        component.set("v.refreshForm", true);
    }
})
