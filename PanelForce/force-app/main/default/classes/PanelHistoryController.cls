public class PanelHistoryController {
	@AuraEnabled
    public static List<Panel__c> GetContactPanels(string contactId){   
        /* Returns Panel__c Filtered by Contact Name */
        system.debug(contactId);
        id contactnumber = id.valueof(contactId);
        system.debug(contactnumber);
        List<Panel__c> panelList  = [SELECT Name, Panel__c.Contact__r.Name, id FROM Panel__c WHERE Contact__c =: contactnumber];
        system.debug('you enter this');
        return panelList;
    }
}