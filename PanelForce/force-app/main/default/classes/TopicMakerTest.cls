@isTest
public class TopicMakerTest {
    @testSetup
    static void testTopicMakerSetup(){
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
    //[tech1,tech2,tech3,tech4]
    @isTest
    static void createTopicsPositive() {
        Test.startTest();
        Test.stopTest();

        List<Panel__c> panelList = [SELECT Id, Name FROM Panel__c];
        List<Curriculum__c> temp  = [SELECT Name, Max_Scores__c, Topics__c FROM Curriculum__c];//
        List<Topic__c> top = [SELECT Name, Max_Score__c, Panel__c FROM Topic__c WHERE Name LIKE 'Tech%'];

        System.assertEquals(4 * panelList.size(), top.size());//check if correct number of Topic__c objects where created
        for(Integer i = 0; i<temp.size(); i++){
            List<String> techs = temp[i].Topics__c.split(',');
            List<String> maxScore = temp[i].Max_Scores__c.split(',');
            for(Integer j = 0; j<4; j++){
                System.assertEquals('Tech'+(j+1), techs[j]);
                System.assertEquals(20 + (j+1), Integer.valueOf(maxScore[j]));
                
            }
        }
        
        
        //System.assertEquals('Tech1', Topic.name);
        //System.assertNotEquals(' ', temp.Topics__c);
        //System.assertNotEquals(' ', temp.Max_Scores__c);

        

        // !! Check Max Score rollup !!
    
    }
    @isTest
    static void createTopicsNegative() {
        Test.startTest();
        Test.stopTest(); 
        Contact con = [SELECT Id FROM Contact WHERE LastName = 'Rhee' LIMIT 1];
        //Bad cases
        try{
        Curriculum__c badCurr1 = new Curriculum__c(Name = 'badTemp1', Topics__c = 'Tech1,Tech2,Tech3', Max_Scores__c = '20,21,22,23');
        Curriculum__c badCurr2 = new Curriculum__c(Name = 'badTemp2', Topics__c = 'Tech1,Tech2,Tech3,Tech4', Max_Scores__c = '20,21,22');
        insert badCurr1;
        insert badCurr2;

        //bad panel cases
        Panel__c badPanel1 = new Panel__c(Template__c = badCurr1.Id, Contact__c = con.Id);
        Panel__c badPanel2 = new Panel__c(Template__c = badCurr2.Id, Contact__c = con.Id);
        insert badPanel1;
        insert badPanel2;
        }//end try block
        catch(Exception e){
            System.debug(e.getMessage());
            Boolean expectedExceptionThrown = e.getMessage().contains('CSV are not the same size');
            System.assert(expectedExceptionThrown);
        }

    }
}