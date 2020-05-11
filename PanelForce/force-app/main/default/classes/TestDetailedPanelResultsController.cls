@isTest
public class TestDetailedPanelResultsController {
    
    @testSetup
    static void setupPanelTest(){
        List<Panel__c> pans = new List<Panel__c>();
        List<Curriculum__c> currs = new List<Curriculum__c>();
        Contact con = new Contact(LastName = 'Rhee');
        insert con;

        for (Integer i = 0; i < 10; i++) {
            Curriculum__c curr = new Curriculum__c(Name = 'Temp');
            curr.Topics__c = 'Tech1,Tech2,Tech3,Tech4';
            curr.Max_Scores__c = '21,22,23,24';
            currs.add(curr);
            // currs.add(new Curriculum__c(Name = 'Temp', Topics__c = 'Tech1,Tech2,Tech3,Tech4', Max_Scores__c = '21,22,23,24'));
            
        }
        insert currs;

        for (Integer i = 0; i < 10; i++) {
            pans.add(new Panel__c(Template__c = currs[i].Id, Contact__c = con.Id));
            System.debug(currs[i]);
            System.debug(pans[i]);
        }
        insert pans;
    }
    
    @isTest
    public static void testGetPanel(){
        Panel__c randomPanel = [SELECT Name, Id FROM Panel__c LIMIT 1];
        String testId = randomPanel.Id;
        test.startTest();
        Panel__c checkPanel = DetailedPanelResultsController.GetPanel(testId);
        test.stopTest();
        System.assertEquals(testId, checkPanel.Id);
        
    }
    
    @isTest
    public static void testGetTopics(){
        Panel__c randomPanel = [SELECT Name, Id FROM Panel__c LIMIT 1];
        String testId = randomPanel.Id;
        List<Topic__c> testTopics = [SELECT Name, Max_Score__c FROM Topic__c WHERE Panel__r.Id =: testId];
        test.startTest();
        List<Topic__c> gottenTopics = DetailedPanelResultsController.GetTopics(testId);
        test.stopTest();
        System.assertEquals(testTopics.size(), gottenTopics.size());
        for(integer i = 0; i < testTopics.size(); i++){
            system.assertEquals(testTopics[i].Name, gottenTopics[i].Name);
            system.assertEquals(testTopics[i].Max_Score__c, gottenTopics[i].Max_Score__c);
        }
    }

}