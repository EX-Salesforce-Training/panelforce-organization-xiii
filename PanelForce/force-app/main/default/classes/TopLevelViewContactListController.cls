public class TopLevelViewContactListController{

    @AuraEnabled
    public static List<Contact> GetContacts()
    {
		List<Contact> contactList = [SELECT Name, Phone, Email, Id FROM Contact];
    
    	return contactList;        
    }
}