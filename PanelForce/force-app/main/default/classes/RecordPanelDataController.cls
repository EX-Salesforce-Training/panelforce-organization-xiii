public class RecordPanelDataController{
    @auraEnabled
    public static List<Topic__c> getTopics(String panelID) {

        Panel__c panel = [SELECT Id,(SELECT Id,Name,Actual_Score__c,Max_Score__c,Repanel__c FROM Topics__r) FROM Panel__c WHERE ID=:panelID];

        System.Debug(panel.Topics__r);
        return panel.Topics__r;
    }

    /*
    @auraEnabled
    public static Curriculum__c getPanel(String id){

        System.Debug(id);
        Panel__c panelList = [SELECT Id,Contact__c,Template__c FROM Panel__c WHERE ID=:id];

        Curriculum__c cur = getTopics(panelList.Template__c);
        system.debug(panelList);
        system.debug(cur);

        return cur;
    }
    */

    @AuraEnabled
    public static void updatePanelTopics(String panelId, List<Topic__c> topics ){
        Panel__c panel = [SELECT Id,(SELECT Id,Actual_Score__c,Repanel__c,Comments__c FROM Topics__r) FROM Panel__c WHERE ID=:panelId];
        

        List<Topic__c> oldTopics = panel.Topics__r;


        for(Integer i = 0;i<oldTopics.Size();i++){

            for(Integer j =0;j<topics.Size();j++){
                if(topics[j].id==oldTopics[i].id){
                    oldTopics[i].Actual_Score__c = topics[j].Actual_Score__c;
                    oldTopics[i].Comments__c = topics[j].Comments__c;
                    oldTopics[i].Repanel__c = topics[j].Repanel__c;
                }
            }

        } 

        update oldTopics;
        /*
        String[] tpNames;
        Integer[] tpScores;

        for(Integer j =0;j<topics.Size();j++){

            for(Integer i = 0;i<panel.Topics__r.Size();i++){

                
                topic.Actual_Score__c = tpScores[i];
            
            } 
        }
        */

    }

}