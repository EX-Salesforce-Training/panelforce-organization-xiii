@isTest
public class PanelGrabberTest {
    @isTest
    public static void getPanelByDateTimeTest() {
        Contact con = new Contact(LastName='testContact');
        Curriculum__c cur = new Curriculum__c(Name = 'curTest', Topics__c = 'Tech1,Tech2,Tech3,Tech4', Max_Scores__c = '20,21,22,23');

        insert con;
        insert cur;

        // con = [SELECT Id FROM Contact WHERE LastName =: con.LastName LIMIT 1];
        // cur = [SELECT Id FROM Curriculum__c WHERE Name =: cur.Name LIMIT 1];

        System.debug(con);
        System.debug(cur);

        Panel__c pan = new Panel__c(Contact__c = con.Id, Template__c = cur.Id, Date_Time__c = Datetime.newInstance(2020, 5, 7, 1, 30, 0));

        insert pan;

        System.assertEquals(pan.Id, PanelGrabber.getPanelByDateTime(Datetime.newInstance(2020, 5, 7, 1, 30, 0), con.Id));
    }
}
