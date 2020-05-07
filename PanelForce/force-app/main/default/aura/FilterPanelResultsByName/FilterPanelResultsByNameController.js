({
    /* Initializes the Data Table with All Panels */
    init: function (component, event, helper){
        
        var actions = [
            { label: 'View Panel Results', name: 'View_Panel_Results' },
            { label: 'View Associate History', name: 'View_Associate_History' }
        ]
        
        component.set('v.mycolumns', [
            {label: 'Panel', fieldName: 'Name', type: 'text'},
            {label: 'Contact Name', fieldName: 'ContactName', type: 'text'},
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        helper.getData(component);
    },
    
    /* Updates the Data Table with Filtered Panels on Enter Key Press */
    handleKeyUp : function (component, event, helper){
        
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            
            var queryTerm = component.find('search').get('v.value');
            //alert('Searched for "' + queryTerm + '"!');
            
            helper.getFilteredPanelList(component, queryTerm);
        }
    },
    
    handleRowAction: function (cmp, event, helper){
        
        console.log("Entered controller with event.");
        var action = event.getParam('action');
        var row = event.getParam('row');
        var panelId = row.Id;
        //console.log(panelName);
       
        switch (action.name){
            case 'View_Panel_Results':
                console.log("Entered action to fire event.");
                var PanelNavEvent = cmp.getEvent('PanelEvent');
                PanelNavEvent.setParams({ "panelId" : panelId });
                console.log("Set params for event.");
                
                try{
                    PanelNavEvent.fire();
                }
                catch(e){
                    console.error(e);
                }
                
                break;
            case 'View_Associate_History':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
        }
    }
})