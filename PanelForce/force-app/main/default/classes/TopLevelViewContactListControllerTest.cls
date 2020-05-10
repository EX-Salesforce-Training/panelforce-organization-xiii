@isTest
private class TopLevelViewContactListControllerTest {

    static testMethod void testContactCotroller() {
        Contact contactListName = new Contact();
        contactListName.LastName= 'Runs';
        contactListName.Phone='555-555-5555';
        contactListName.Email='test@email.com';
        insert contactListName;
         system.debug(contactListName);

	List <Contact> cons =[SELECT LastName, Phone, Email, Id FROM Contact WHERE Phone ='555-555-5555' LIMIT 1];

	Test.startTest();
         List <Contact> conTest= TopLevelViewContactListController.GetContacts();
        Test.stopTest();

	system.assert(conTest != null);
    }
}