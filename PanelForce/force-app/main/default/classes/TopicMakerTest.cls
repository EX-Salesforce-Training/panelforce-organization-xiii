@isTest
public class TopicMakerTest {
    @testSetup
    static void TestTopicMakerSetup(){
        List<Panel__c> pen = new List<Panel__c>();
        
        //[SELECT Id, Name, Contact__c, Template__r.Topics__c, Template__r.Max_Score__c FROM Panel__c];
        //Panel__c pen = new Panel__c(Name = '', );

        for (Integer i = 0; i < 10; i++){
            // contact__c con = new Contact__c(LastName = 'TestLastName' + i, FirstName = 'TestFirstName' + i);
            Curriculum__c temp = new Curriculum__c(Name = 'Temp' + i);
            temp.Topics__c = 'Tech1, Tech2, Tech3, Tech4';
            temp.Max_Scores__c = '20, 24, 16, 25';
            
            insert temp;
            Panel__c x  = new Panel__c(Template__r = temp);
            pen.add(x);
        }
        insert pen;
        
   
    }

    @isTest
    static void testTopicMaker() {
        Panel__c ivan = new Panel__c();
        List<Panel__c> panelList = [SELECT Id, Name FROM Panel__c];
        Curriculum__c temp  = [SELECT Name, Max_Scores__c, Topics__c FROM Curriculum__c WHERE Name = 'Temp 1' LIMIT 1];
        // Topic__c top = [SELECT Name, Max_Score__c, Panel__c FROM Topic__c WHERE ];
        System.assertEquals('Tech1', temp.Topics__c);  
        System.assertEquals('20', temp.Max_Scores__c);
            
        System.assertNotEquals(' ', temp.Topics__c);
        System.assertNotEquals(' ', temp.Max_Scores__c);

        // System.assertEquals( );
        

        
    
    }
}