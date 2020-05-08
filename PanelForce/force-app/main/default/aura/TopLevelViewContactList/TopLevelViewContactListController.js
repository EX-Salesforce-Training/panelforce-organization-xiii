({
    init : function(component, event, helper){
        
        var actions = [
            { label: 'View Contact Information', name: 'View_Contact_Information' }
        ]
        
        component.set('v.columns', [
            { label: 'Contact Name', fieldName: 'Name', type: 'text' },
            { label: 'Contact Phone Number', fieldName: 'Phone', type: 'phone' },
            { label: 'Contact Email', fieldName: 'Email', type: 'email' },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        helper.getData(component);
    },
    
    handleRowAction : function (component, event, helper){
        
        var action = event.getParam('action');
        var row = event.getParam('row');
        
        switch (action.name){
            case 'View_Contact_Information':
                component.set("v.contactId", row.Id);
                
                try{
                    component.set("v.contactListIsVisible", false);			//error happens here
                }
                catch(e){
                    console.log("Error: " + e.getMessage());
                }
                
                break;
        }
    },
    ChangeView : function (component, event, helper){
        component.set("v.contactListIsVisible", true);
    }
})