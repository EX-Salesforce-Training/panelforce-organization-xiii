@isTest
public class RecordPanelDataControllerTest {

    @TestSetup
    public static void testSetup(){
        
                
    }
    @isTest
    public static void testGetTopics(){
         test.startTest();
        //Create contacts to associate to panels
        Contact testContact = new Contact(LastName = 'Test Name');
        insert testContact;
        //create curriculums (templates) to associate to panels
        Curriculum__c testCurr = new Curriculum__c(Name = 'Test Curr', Max_Scores__c = '2,3', Topics__c = 'topic 2,topic3');
        insert testCurr;
        //Create a bunch of test panels.
        Panel__c testPanel = new Panel__c(Template__c = testCurr.Id, Contact__c = testContact.Id );
        insert testPanel;
        
        //
        List<Topic__c> listTopic = RecordPanelDataController.getTopics(testPanel.id);
        
        //New list of topics
        
        List<Topic__c> newTopicsList = listTopic;
        newTopicsList[0].Actual_Score__c = 100;
        Id topicId = newTopicsList[0].Id;
        newTopicsList[0].Comments__c = 'Comment';
        newTopicsList[1].Comments__c = 'Comment';
        
       
        RecordPanelDataController.updatePanelTopics(testPanel.id, newTopicsList );
        system.debug('Record panel test stuff' + newTopicsList);
        Panel__c newPanel = [Select id, (SELECT Actual_Score__c FROM Topics__r WHERE id = : topicId) FROM Panel__c WHERE id =: testPanel.Id];
        system.debug(newPanel);
        
        System.assert(listTopic.size() != 0);
        System.assertEquals(100,newPanel.Topics__r[0].Actual_Score__c);
        
        
        Test.stopTest();
            
        
       }//End testgetTopics
    
   
    
}