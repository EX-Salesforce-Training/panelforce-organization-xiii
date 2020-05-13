@isTest
public class CurriculumControllerTest {

    // @TestSetup
    // static void makeData(){
    //     Curriculum__c curr = new Curriculum__c();
    //     curr.Name = 'Test';
    //     curr.Max_Score__c = '34,56,34';
    //     curr.Topics__c = 'Tech1,Tech2,Tech3';

    //     insert curr;
    // }
    // 
    @isTest
    static void topicTest(){
        
        test.startTest();
        
        system.assertNotEquals(Null, CurriculumController.createTopic());
        
        test.stopTest();
    }

    @isTest
    static void curriculumTest(){

        Curriculum__c curr = new Curriculum__c();
        curr.Name = 'Test';
        curr.Max_Scores__c = '34,56,34';
        curr.Topics__c = 'Tech1,Tech2,Tech3';

        Curriculum__c curr2 = new Curriculum__c();
    
        CurriculumController.createCurriculum(curr);
        CurriculumController.createCurriculum(curr2);
        
        // try{
            
        // }
        // catch (Exception e){
           

        //     system.assertNotEquals(null, e.getMessage());
        // }
        

        Curriculum__c testcurr = [SELECT Id, Name, Max_Scores__c FROM Curriculum__c LIMIT 1];

        system.assertEquals(curr.Max_Scores__c, testcurr.Max_Scores__c);
        system.assertEquals(curr.Name, testcurr.Name);
        System.assertEquals(StatusCode.FIELD_CUSTOM_VALIDATION_EXCEPTION, CurriculumController.code);
    
        /*try {
                insert new Account();
}   catch (System.DmlException ex) {
      System.assertEquals(
         StatusCode.REQUIRED_FIELD_MISSING,
         ex.getDmlType(0));
} */
    }
}