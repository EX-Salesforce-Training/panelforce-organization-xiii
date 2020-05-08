({
    ChangeToPanelResultsComponent : function(component, event, helper){
        
        var info = event.getParam("panelId");
        component.set("v.panelId", info);
        component.set("v.contactViewIsVisible", false);
    }
})