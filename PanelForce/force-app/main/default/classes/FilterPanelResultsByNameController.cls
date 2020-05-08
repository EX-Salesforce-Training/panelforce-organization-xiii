public class FilterPanelResultsByNameController{
    
    @AuraEnabled
    public static List<Panel__c> GetPanels(){
        
        /* Returns All Panel__c in Org */
        List<Panel__c> panelList  = [SELECT Name, Panel__c.Contact__r.Name, Id FROM Panel__c];
        
        return panelList;
    }
    
    @AuraEnabled
    public static List<Panel__c> GetContactPanels(String contactName){
        
        String contactNameString = '%' + contactName + '%';
        String escapedContactNameString = String.escapeSingleQuotes(contactNameString);
        
        /* Returns Panel__c Filtered by Contact Name */
        List<Panel__c> panelList  = [SELECT Name, Panel__c.Contact__r.Name, Id FROM Panel__c WHERE Panel__c.Contact__r.Name LIKE :escapedContactNameString];
        
        return panelList;
    }
}