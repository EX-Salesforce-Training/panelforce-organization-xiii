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
    public static void updatePanelTopics(String panelId, List<Topic__c> topics, Panel__c panelObj){
        //Retrieve the one panel by using the provided panelId. 
        Panel__c panel = [SELECT Id,Date_Time__c,Client_Interview_Ready__c,Overall_Feedback__c,Panel_Comments__c,Recording_Link__c,
                                    (SELECT Id,Actual_Score__c,Repanel__c,Comments__c FROM Topics__r) FROM Panel__c WHERE ID=:panelId];
        
        
        
        
        DateTime NOW = datetime.now();
        
        DateTime LAST_HOUR = NOW.addHours(1);
        
        System.Debug('This is PanelObj: ' +panelObj + ' ' + NOW + ' ' + LAST_HOUR);
        
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
        
        panel.Client_Interview_Ready__c = panelObj.Client_Interview_Ready__c;
        panel.Overall_Feedback__c = panelObj.Overall_Feedback__c;
        panel.Panel_Comments__c = panelObj.Panel_Comments__c;
        panel.Recording_Link__c = panelObj.Recording_Link__c;
        panel.Date_Time__c = LAST_HOUR;

        System.Debug('old: ' + panel);
        
        update oldTopics;
        update panel;
        System.Debug('new: ' + panel);
        
        

    }

}