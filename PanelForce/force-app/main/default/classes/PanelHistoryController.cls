public class PanelHistoryController{
    
	@AuraEnabled
    public static List<Panel__c> GetContactPanels(string contactId){   
        /* Returns Panel__c Filtered by Contact Name */
        id contactnumber = id.valueof(contactId);
        List<Panel__c> panelList  = [SELECT Name, Total_Score__c, Max_Score__c, Panel__c.Contact__r.Name, Id, Topics_to_be_Repaneled__c FROM Panel__c WHERE Contact__c =: contactnumber];
        
        return panelList;
    }
}