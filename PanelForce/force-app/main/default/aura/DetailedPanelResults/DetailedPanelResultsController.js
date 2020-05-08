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
    
    cancelClick : function(component, event, helper){
        
        alert("You clicked: " + event.getSource().get("v.label"));
    },
    
    previousClick : function(component, event, helper){
        
        alert("You clicked: " + event.getSource().get("v.label"));
    },
    
    nextClick : function(component, event, helper){
        
        alert("You clicked: " + event.getSource().get("v.label"));
    }
})