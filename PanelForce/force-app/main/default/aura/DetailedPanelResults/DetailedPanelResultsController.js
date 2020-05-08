({
    init : function(component, event, helper){
        
        component.set('v.columns', [
            {label: 'Technology', fieldName: 'Name', type: 'text' ,cellAttributes: { alignment: 'center' }},
            {label: 'Max Score', fieldName: 'Max_Score__c', type: 'number', cellAttributes: { alignment: 'center' }},
            {label: 'Actual Score', fieldName: 'Actual_Score__c', type: 'number', cellAttributes: { alignment: 'center' }},
            {label: 'Repanel', fieldName: 'Repanel__c', type: 'boolean', cellAttributes: { alignment: 'center' }},
            {label: 'Comment', fieldName: 'Comments__c', type: 'text', cellAttributes: { alignment: 'center' }}
        ]);
        
        var info = component.get("v.selectedPanelId");
        helper.getPanel(component,event,helper,info);
        helper.getTopics(component,event,helper,info);
    },
    
    GoBack : function(component, event, helper){
        if(component.get(ContactReturn) == true){
            var EditEvent = cmp.getEvent('ReturnPrevious2');
            EditEvent.fire(); 
        }
        else{
            var EditEvent = cmp.getEvent('ReturnPrevious');
            EditEvent.fire(); 
        }
    },
    
    EditEvent : function(component, event, helper){
        
        var EditEvent = cmp.getEvent('EditEvent');
        EditEvent.setParams({ "PanelToEditId" : panelId });
        EditEvent.fire(); 
    }
})