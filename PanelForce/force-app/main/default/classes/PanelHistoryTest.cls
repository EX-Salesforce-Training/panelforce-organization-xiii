@isTest
Private class PanelHistoryTest {
    @isTest static void Test1(){
        contact c = new contact(lastname = 'John');
        list<contact> cc = new list<contact>();
        list<Panel__c> Pan1 = new list<Panel__c>();
        cc.add(c);
        insert cc;
        Curriculum__c cur = new Curriculum__c(Name = 'Test Curriculum', Topics__c='Topic 1', Max_Scores__c='30');
        insert cur;
        Panel__c pan = new Panel__c(Contact__c = cc[0].Id, Template__c = cur.Id, Duration__c = '90');
        Pan1.add(pan);
        insert Pan1;    
        
        contact contactId = [select lastname ,Id from contact where lastname ='John'];      
        
        list<Panel__c> obj1 = PanelHistoryController.GetContactPanels(contactId.Id);
        System.assertEquals(obj1[0].Contact__r.Name, 'John');
        system.debug(obj1);
        
    }
}