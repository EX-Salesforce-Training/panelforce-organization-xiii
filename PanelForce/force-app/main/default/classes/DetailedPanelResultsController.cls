public class DetailedPanelResultsController {
    @AuraEnabled
    public static Panel__c GetPanel(String Name){
        Panel__c getPanel = [SELECT Panel__c.Contact__r.Name, Panel__c.Assigned_To__r.Name, Date_Time__c, Duration__c, Mode__c, 
                             Client_Interview_Ready__c, Overall_Feedback__c, Panel_Comments__c, Placement__c, Panel_Round__c,
                             Recording_Consent__c, Recording_Link__c, Stability__c, Panel__c.Template__r.Name, Panel__c.Training_Assignment__r.Name, Max_Score__c, 
                             Total_Score__c FROM Panel__c WHERE Name =: Name LIMIT 1];
        
        return getPanel;
    }
    @AuraEnabled
    public static List<Topic__c> GetTopics(String Name){
        List<Topic__c> topics = [SELECT Name, Actual_Score__c, Comments__c, Max_Score__c, Repanel__c FROM Topic__c WHERE Panel__r.Name =: Name];
        return topics;
    }
}