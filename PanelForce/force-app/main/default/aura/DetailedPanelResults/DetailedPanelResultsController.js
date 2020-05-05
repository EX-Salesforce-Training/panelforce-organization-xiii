({
    init : function(component, event, helper) {
        console.log('here');
        component.set('v.columns', [
            {label: 'Technology', fieldName: 'Name', type: 'text' ,cellAttributes: { alignment: 'center' }},
            {label: 'Max Score', fieldName: 'Max_Score__c', type: 'number', cellAttributes: { alignment: 'center' }},
            {label: 'Actual Score', fieldName: 'Actual_Score__c', type: 'number', cellAttributes: { alignment: 'center' }},
            {label: 'Repanel', fieldName: 'Repanel__c', type: 'boolean', cellAttributes: { alignment: 'center' }},
            {label: 'Comment', fieldName: 'Comments__c', type: 'text', cellAttributes: { alignment: 'center' }}
        ]);
        helper.getPanel(component,event,helper);
        helper.getTopics(component,event,helper);
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