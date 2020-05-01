({
	handleChange : function(component, event, helper) {
		
        console.log(event.getParam('value'));
        if(event.getParam('value')=="checked"){
            component.find("comments").set("v.required",true);
        
        }else{
            component.find("comments").set("v.required",false);
        
        }
    },
    
    onAddClick: function(component,event,helper){
        
    }
})