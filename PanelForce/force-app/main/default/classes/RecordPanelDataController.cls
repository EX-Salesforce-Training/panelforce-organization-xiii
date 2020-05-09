public class RecordPanelDataController{
    
    /* Retrieve the Topics related to the specific panel.
    Provide a unique panel object Id. Returns a list of related topics. */
    @auraEnabled
    public static List<Topic__c> getTopics(String panelID) {
        //Query for panel with child-query for related topics.
        Panel__c panel = [SELECT Id,(SELECT Id,Name,Actual_Score__c,Max_Score__c,Repanel__c FROM Topics__r) FROM Panel__c WHERE ID=:panelID];

        //System.Debug(panel.Topics__r);
        return panel.Topics__r;
    }

    
    /* Query for a specific panel. Accepts a panelId and list of topics. Returns nothing. 
    Updates the Topic object's fields related to the panel. */
    @AuraEnabled
    public static void updatePanelTopics(String panelId, List<Topic__c> topics ){
        //Retrieve the one panel by using the provided panelId. 
        Panel__c panel = [SELECT Id,(SELECT Id,Actual_Score__c,Repanel__c,Comments__c FROM Topics__r) FROM Panel__c WHERE ID=:panelId];
        
        //Store Topics related to retrieved panel object.
        List<Topic__c> oldTopics = panel.Topics__r;

        //Update each related topic.
        for(Integer i = 0;i<oldTopics.Size();i++){
            //field by field.
            for(Integer j =0;j<topics.Size();j++){
                if(topics[j].id==oldTopics[i].id){
                    oldTopics[i].Actual_Score__c = topics[j].Actual_Score__c;
                    oldTopics[i].Comments__c = topics[j].Comments__c;
                    oldTopics[i].Repanel__c = topics[j].Repanel__c;
                }
            }

        } 

        update oldTopics;
        

    }

}