({
    ChangeToPanelResultsComponent : function(component, event, helper){
        var info = event.getParam("panelId");
        component.set("v.panelId", info);
        component.set("v.contactViewIsVisible", false);
    },
    ChangeView : function(component, event, helper){
        component.set("v.contactViewIsVisible", true);
    },
    GoBack : function(component, event, helper){ 
        var EditEvent = cmp.getEvent('EditEvent');
        EditEvent.setParams({ "return" : true });
        EditEvent.fire(); 
    }
})