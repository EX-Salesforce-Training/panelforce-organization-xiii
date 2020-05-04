@isTest
public class TopicMakerTest {
    @testSetup
    static void testTopicMakerSetup(){
        List<Panel__c> pans = new List<Panel__c>();
        List<Curriculum__c> currs = new List<Curriculum__c>();
        Contact con = new Contact(LastName = 'Rhee');

        for (Integer i = 0; i < 100; i++)
            currs.add(new Curriculum__c(Name = 'Temp', Topics__c = 'Tech1, Tech2, Tech3, Tech4', Max_Scores__c = '20, 24, 16, 25'));
        insert currs;

        for (Integer i = 0; i < 100; i++)
            pans.add(new Panel__c(Template__c = currs[i].Id, Contact__c = con.Id));
        insert pans;
    }
    @isTest
    static void createTopicsPositive() {
        Test.startTest();
        Test.stopTest();
        Panel__c ivan = new Panel__c();
        List<Panel__c> panelList = [SELECT Id, Name FROM Panel__c];
        Curriculum__c temp  = [SELECT Name, Max_Scores__c, Topics__c FROM Curriculum__c WHERE Name = 'Temp 1' LIMIT 1];
        // Topic__c top = [SELECT Name, Max_Score__c, Panel__c FROM Topic__c WHERE ];
        System.assertEquals('Tech1', temp.Topics__c);  
        System.assertEquals('20', temp.Max_Scores__c);
            
        System.assertNotEquals(' ', temp.Topics__c);
        System.assertNotEquals(' ', temp.Max_Scores__c);

        // System.assertEquals( );
        

        // Check Max Score rollup
    
    }
    @isTest
    static void createTopicsNegative() {
        Test.startTest();
        Test.stopTest(); 
    }//Gone to restroom - Sergio && Jeffrey
}