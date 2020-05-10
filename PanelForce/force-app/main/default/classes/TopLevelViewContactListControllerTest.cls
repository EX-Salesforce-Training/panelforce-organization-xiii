@isTest
private class TopLevelViewContactListControllerTest {
        
    static testMethod void testContactCotroller() {
        Contact contactListName = new Contact();
        contactListName.LastName= 'Runs';
        contactListName.Phone='555-555-5555';
        contactListName.Email='test@email.com';
        insert contactListName;
        system.debug(contactListName);
        
        List <Contact> cons =[SELECT LastName, Phone, Email, Id FROM Contact WHERE Phone ='555-555-5555'];
        
        List <Contact> conTest = TopLevelViewContactListController.GetContacts();
        
        system.debug(cons);
        system.assert(cons != null);
    }
}