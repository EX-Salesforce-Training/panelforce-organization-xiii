({
	init: function(component, event, helper) {
		 var actions = [
            { label: 'Show details', name: 'show_details' }
        ]
       
        component.set('v.mycolumns', [
            {label: 'Panel', fieldName: 'Name', type: 'text'},
            {label: 'Contact Name', fieldName: 'ContactName', type: 'text'},
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        helper.getData(component, event, helper);
    }
	
})