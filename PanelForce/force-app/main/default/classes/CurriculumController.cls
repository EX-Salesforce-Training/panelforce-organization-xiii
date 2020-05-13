public class CurriculumController {
    
    public static StatusCode code;

    @AuraEnabled
    public static void createCurriculum(Curriculum__c cur){
        try{
            insert cur;
        }
        catch(DmlException e){
            code = e.getDmlType(0);
        }
    }
    
    @AuraEnabled
    public static Topic__c createTopic(){
        return new Topic__c();
    }
}