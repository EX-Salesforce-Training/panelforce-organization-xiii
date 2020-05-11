({
    /* Initializes the Data Table with All Panels */
    init: function (component, event, helper){
        
        var actions = [
            { label: 'View Panel Results', name: 'View_Panel_Results' },
            { label: 'Edit Panel', name: 'Edit_Panel_Info' }
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
        
        var action = event.getParam('action');
        var row = event.getParam('row');
        var panelId = row.Id;
        //console.log(panelName);
       
        switch (action.name){
            case 'View_Panel_Results':
                var PanelNavEvent = cmp.getEvent('PanelEvent');
                PanelNavEvent.setParams({ "panelId" : panelId });
                PanelNavEvent.fire();                
                break;
            case 'Edit_Panel_Info':
                console.log("Enter edit");
                var EditEvent = cmp.getEvent('EditEvent');
                EditEvent.setParams({ "PanelToEditId" : panelId });
                EditEvent.fire();
                console.log(EditEvent.get)
                break;
        }
    }
})