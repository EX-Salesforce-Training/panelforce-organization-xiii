({
	navToView : function(component, event, helper) {
		component.set("v.selectedTabId", "viewpanel");
	},
	navToRecord : function(component, event, helper) {
		let method = component.get("c.getPanelByDateTime");
		method.setParams({"dt" : event.getParam("datetime"), "contactId" : event.getParam("contact")});
		method.setCallback(this, function(response) {
			if (response.getState() === "SUCCESS") {
				component.set("v.panelId", response.getReturnValue());
				component.set("v.createPanel", false);
				component.set("v.selectedTabId", "conductpanel");
			} else console.alert("System callout failed, state is " + response.getState() + "\nError is " + response.getError());
		});
		$A.enqueueAction(method);
	}
})