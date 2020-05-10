@isTest
public class FilterPanelResultsByNameControllerTest{
    
    final static Integer NUMBER_OF_RECORDS = 2;
    
    @TestSetup
    private static void GenerateMockData(){
        
        List<Contact> contactList = new List<Contact>();
        List<Panel__c> panelList = new List<Panel__c>();
        
        //Mock Curriculum
        Curriculum__c curr = new Curriculum__c();
        curr.Name = 'Test Curriculum';
        curr.Topics__c = 'PostalForce,AuraForce,PanelForce';
        curr.Max_Scores__c = '5,10,15';
        insert curr;
        
        //Mock Contacts
        for (Integer i = 0; i < NUMBER_OF_RECORDS; i++){
            
            Contact con = new Contact();
            con.FirstName = 'Test Contact';
            con.LastName = String.valueOf(i);
            con.Phone = '(555) 555-555' + String.valueOf(i);
            con.Email = 'test.contact-' + String.valueOf(i) + '@test.com';
            contactList.add(con);
        }
        
        insert contactList;
        
        //Mock Panels
        for (Integer i = 0; i < NUMBER_OF_RECORDS; i++){
            
            Panel__c pan = new Panel__c();
            pan.Contact__c = contactList[i].Id;
            pan.Template__c = curr.Id;
            panelList.add(pan);
        }
        
        insert panelList;
    }
    
    @isTest
    public static void GetPanelsTest(){
        
        List<Panel__c> panelList = FilterPanelResultsByNameController.GetPanels();
        
        System.assertEquals(NUMBER_OF_RECORDS, panelList.size());
    }
    
    @isTest
    public static void GetContactPanelsTest(){
        
        List<Panel__c> panelList = FilterPanelResultsByNameController.GetContactPanels('Test Contact 0');
        
        System.assertEquals(1, panelList.size());
        System.assertEquals('Test Contact 0', panelList[0].Contact__r.Name);
    }
}