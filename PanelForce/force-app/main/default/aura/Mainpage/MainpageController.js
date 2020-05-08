({
	navToView : function(component, event, helper) {
		console.log('navtoview');
		component.set("v.selectedTabId", "viewpanel");
		component.set("v.createPanel", true);
	},
	navToRecord : function(component, event, helper) {
		let method = component.get("c.getPanelByDateTime");
		method.setParams({"dt" : event.getParam("datetime"), "contactId" : event.getParam("contact")});
		method.setCallback(this, function(response) {
			if (response.getState() === "SUCCESS") {
				console.log(response.getReturnValue());
				component.set("v.panelId", response.getReturnValue());
				
				try {
				component.set("v.createPanel", false);
				console.log(component.get("v.createPanel"));
				} catch (e) {console.log(e)}

				component.set("v.selectedTabId", "conductpanel");
			} else console.alert("System callout failed, state is " + response.getState() + "\nError is " + response.getError());
		});
		$A.enqueueAction(method);
	}
})