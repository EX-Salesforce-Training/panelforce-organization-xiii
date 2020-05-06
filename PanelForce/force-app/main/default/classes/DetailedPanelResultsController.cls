public class DetailedPanelResultsController {
    @AuraEnabled
    public static Panel__c GetPanel(String Name){
        Panel__c getPanel = [SELECT Panel__c.Contact__r.Name, Panel__c.Assigned_To__r.Name, Date_Time__c, Duration__c, Mode__c, 
                             Client_Interview_Ready__c, Overall_Feedback__c, Panel_Comments__c, Placement__c, Panel_Round__c,
                             Recording_Consent__c, Recording_Link__c, Stability__c, Panel__c.Template__r.Name, Panel__c.Training_Assignment__r.Name, Max_Score__c, 
                             Total_Score__c, Topics_to_be_Repaneled__c FROM Panel__c WHERE Name =: Name LIMIT 1];
        
        return getPanel;
    }
    @AuraEnabled
    public static List<Topic__c> GetTopics(String Name){
        //integer count = 0;
        //integer Max_Score = 0;
        //integer final_score = 0;
        List<Topic__c> topics = [SELECT Name, Actual_Score__c, Comments__c, Max_Score__c, Repanel__c FROM Topic__c WHERE Panel__r.Name =: Name];
        /*for(Topic__c topic: Topics){
            if(topic.Repanel__c == true){
                count++;
            }
            Max_score += topic.Max_Score__c;
            final_score += topic.Actual_Score__c;
            
        }
        Topic__c lastTopic = new Topic__c();
        lastTopic.Name = 'Total';
        lastTopic.Max_Score__c = Max_score;
        lastTopic.Actual_Score__c = final_score;
        topics.add(lastTopic);*/
        
        return topics;
    }
}