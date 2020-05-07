@isTest
public with sharing class PanelRoundHelperTest {
    @isTest
    public static void incrementPanelRoundTest() {
        Test.startTest();
        Test.stopTest();
        Curriculum__c Curr = new Curriculum__c(Name = 'badTemp1', Topics__c = 'Tech1,Tech2,Tech3,Tech4', Max_Scores__c = '20,21,22,23');
        insert Curr;
        //Create contact list test data
        Contact con1 = new Contact(lastName = 'testContact1' );
        Contact con2 = new Contact(lastName = 'testContact2' );  
        Contact con3 = new Contact(lastName = 'testContact3' );
        insert con1;
        insert con2;
        insert con3; 
        
        //create panel list test data size 5
        List<Panel__c> panelList = new List<Panel__c>();
        for(Integer i =0; i <5 ; i++){
            Panel__c testPanel = new Panel__c(Template__c = Curr.Id, Contact__c = con1.Id);
            PanelList.add(testPanel);
        }
       
        for(Integer i =0; i <10 ; i++){
            Panel__c testPanel = new Panel__c(Template__c = Curr.Id, Contact__c = con2.Id);
            PanelList.add(testPanel);
        }

        for(Integer i =0; i <15 ; i++){
            Panel__c testPanel = new Panel__c(Template__c = Curr.Id, Contact__c = con3.Id);
            PanelList.add(testPanel);
        }

        insert panelList;
        
        List<Panel__c> Panelx5 = [SELECT Id, Panel_Round__c, Template__c, Contact__c FROM Panel__c WHERE Contact__c =:con1.Id];
        List<Panel__c> Panelx10 = [SELECT Id, Panel_Round__c, Template__c, Contact__c FROM Panel__c WHERE Contact__c =:con2.Id];
        List<Panel__c> Panelx15 = [SELECT Id, Panel_Round__c, Template__c, Contact__c FROM Panel__c WHERE Contact__c =:con3.Id];
        
        //Contacts with five panels
        for(Integer i = 0; i < Panelx5.size();i++){
            system.assertEquals(1, Panelx5[i].Panel_Round__c);
        }        
        Panel__c onePanel = new Panel__c(Template__c = Curr.Id, Contact__c = con1.Id, Panel_Comments__c = 'Sergio Lives');
        insert onePanel;
        Panel__c tempPanelOne = [SELECT Panel_Round__c FROM Panel__c WHERE Panel_Comments__c =: 'Sergio Lives' ];
        system.assertEquals(6,tempPanelOne.Panel_Round__c);

        //Contacts with ten panels
        for(Integer i = 0; i < Panelx10.size();i++){
            system.assertEquals(1, Panelx10[i].Panel_Round__c);
        }
        Panel__c twoPanel = new Panel__c(Template__c = Curr.Id, Contact__c = con2.Id, Panel_Comments__c = 'Ivan Lives');
        insert twoPanel;
        Panel__c tempPaneltwo = [SELECT Panel_Round__c FROM Panel__c WHERE Panel_Comments__c =: 'Ivan Lives' ];
        system.assertEquals(11,tempPaneltwo.Panel_Round__c);
        //insert Panelx10[0].clone(false, true);
        //system.assertEquals(11,Panelx10[0].clone(false, true).Panel_Round__c);

        //Contacts with 15 panels. 
       
        for(Integer i = 0; i < Panelx15.size();i++){
            system.assertEquals(1, Panelx15[i].Panel_Round__c);
        }
        Panel__c threePanel = new Panel__c(Template__c = Curr.Id, Contact__c = con3.Id, Panel_Comments__c = 'Lets pass pd1');
        insert threePanel;
        Panel__c tempPanelThree = [SELECT Panel_Round__c FROM Panel__c WHERE Panel_Comments__c =: 'Lets pass pd1' ];
        system.assertEquals(16,tempPanelThree.Panel_Round__c);
        //insert Panelx15[0].clone(false, true);
        //system.assertEquals(16,Panelx15[0].clone(false, true).Panel_Round__c);

    }
}
