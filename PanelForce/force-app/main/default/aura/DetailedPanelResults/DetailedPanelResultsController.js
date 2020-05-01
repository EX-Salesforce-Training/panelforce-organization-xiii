({
	init : function(component, event, helper) {
        console.log('here');
         component.set('v.columns', [
            {label: 'Technology', fieldName: 'Name', type: 'text'},
            {label: 'Max Score', fieldName: 'Max_Score__c', type: 'number'},
            {label: 'Actual Score', fieldName: 'Actual_Score__c', type: 'number'},
            {label: 'Repanel', fieldName: 'Repanel__c', type: 'boolean'},
            {label: 'Comment', fieldName: 'Comments__c', type: 'text'}
        ]);
		helper.getPanel(component,event,helper);
        helper.getTopics(component,event,helper);
	}
})