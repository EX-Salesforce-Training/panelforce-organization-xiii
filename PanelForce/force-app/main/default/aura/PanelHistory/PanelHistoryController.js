({
	init: function(component, event, helper){
        
		 var actions = [
            { label: 'Show details', name: 'show_details' }
        ]
       
        component.set('v.mycolumns', [
            { label: 'Panel Number', fieldName: 'Name', type: 'text' },
            { label: 'Score', fieldName: 'Total_Score__c', type: 'number' },
            { label: 'Max Score', fieldName: 'Max_Score__c', type: 'number' },
            { label: 'Topics To Repanel', fieldName: 'Topics_to_be_Repaneled__c', type: 'number' },
            { label: 'Panel Count', fieldName: 'Panel_Round__c', type: 'number' },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        helper.getData(component, event, helper);
    },
	
    handleRowAction : function (component, event, helper){
        
        var action = event.getParam('action');
        var row = event.getParam('row');
        var panelId = row.Id;
       
        switch (action.name){
            case 'show_details':
                
                try{
                    var PanelNavEvent = component.getEvent('PanelSelectEvent');
                	PanelNavEvent.setParams({ "panelId" : panelId });
                    PanelNavEvent.fire(); 
                }
                catch(e){
                    console.log(e);
                }
                               
                break;
        }
    }
})