({
    /* Initializes the Data Table with All Panels */
    init: function (component, event, helper){
        
        component.set('v.mycolumns', [
            {label: 'Panel', fieldName: 'Name', type: 'text'},
            {label: 'Contact Name', fieldName: 'ContactName', type: 'text'}
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
    }
})