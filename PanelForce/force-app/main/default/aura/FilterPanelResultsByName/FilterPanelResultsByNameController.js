({
    /* Initializes the Data Table with All Panels */
    init: function (component, event, helper){
        
        var actions = [
            { label: 'Show details', name: 'show_details' }
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
     handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
         
         switch (action.name) {
            case 'show_details':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
         }
     }
})