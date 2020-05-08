public class CurriculumController {
	
    @AuraEnabled
    public static void createCurriculum(Curriculum__c cur){
        try{
            insert cur;
        }
        catch(System.DMLexception e){
            System.debug(e);
        }
    }
}