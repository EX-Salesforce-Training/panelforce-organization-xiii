public class TechnologyListController {
	
    @AuraEnabled
    public static List<Topic__c> getTopics(Decimal pageNumber, Integer recordsToDisplay){
        return [SELECT Name, Max_Score__c FROM Topic__c];
    }
}
/*public with sharing class samplePagerCtrl {
   @AuraEnabled
 public static AccountPagerWrapper fetchAccount(Decimal pageNumber ,Integer recordToDisply) {
      Integer pageSize = recordToDisply;
      Integer offset = ((Integer)pageNumber - 1) * pageSize;
    
    // create a instance of wrapper class.
    AccountPagerWrapper obj =  new AccountPagerWrapper();
    // set the pageSize,Page(Number), total records and accounts List(using OFFSET)   
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = [SELECT count() FROM account];
        obj.accounts = [SELECT Id, Name,Phone FROM Account ORDER BY Name LIMIT :recordToDisply OFFSET :offset];
    // return the wrapper class instance .
        return obj;
     }
    
 // create a wrapper class with @AuraEnabled Properties    
 public class AccountPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}
    @AuraEnabled public List<Account> accounts {get;set;}
   }
}

({
   doInit: function(component, event, helper) {
      // this function call on the component load first time     
      // get the page Number if it's not define, take 1 as default
      var page = component.get("v.page") || 1;
      // get the select option (drop-down) values.   
      var recordToDisply = component.find("recordSize").get("v.value");
      // call the helper function   
      helper.getAccounts(component, page, recordToDisply);
 
   },
 
   navigate: function(component, event, helper) {
      // this function call on click on the previous page button  
      var page = component.get("v.page") || 1;
      // get the previous button label  
      var direction = event.getSource().get("v.label");
      // get the select option (drop-down) values.  
      var recordToDisply = component.find("recordSize").get("v.value");
      // set the current page,(using ternary operator.)  
      page = direction === "Previous Page" ? (page - 1) : (page + 1);
      // call the helper function
      helper.getAccounts(component, page, recordToDisply);
 
   },
 
   onSelectChange: function(component, event, helper) {
      // this function call on the select opetion change,	 
      var page = 1
      var recordToDisply = component.find("recordSize").get("v.value");
      helper.getAccounts(component, page, recordToDisply);
   },
 
})

({
   getAccounts: function(component, page, recordToDisply) {
 
      // create a server side action. 
      var action = component.get("c.fetchAccount");
      // set the parameters to method 
      action.setParams({
         "pageNumber": page,
         "recordToDisply": recordToDisply
      });
      // set a call back   
      action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
         // set the component attributes value with wrapper class properties.   
 
         component.set("v.Accounts", result.accounts);
         component.set("v.page", result.page);
         component.set("v.total", result.total);
         component.set("v.pages", Math.ceil(result.total / recordToDisply));
 
      });
      // enqueue the action 
      $A.enqueueAction(action);
   }
})
*/