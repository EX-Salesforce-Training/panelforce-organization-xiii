public class PanelGrabber {
    @AuraEnabled
    public static Id getPanelByDateTime(Datetime dt, Id contactId) {
        return [SELECT Id FROM Panel__c WHERE Contact__c =: contactId AND Date_Time__c =: dt LIMIT 1].Id;
    }
}
