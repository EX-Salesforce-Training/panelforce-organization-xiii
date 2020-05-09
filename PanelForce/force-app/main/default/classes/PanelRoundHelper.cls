public class PanelRoundHelper {
    public static void incrementPanelRound(List<Panel__c> panels) {
        System.Debug('THERE');
        List<Id> contactIds = new List<Id>();
        for (Panel__c p: panels){
            System.Debug('HERE');
            contactIds.add(p.Contact__c);
            System.Debug(contactIds);
            System.Debug(p);
        }
        List<Contact> cons = [SELECT Id, (SELECT Id FROM Panels__r) FROM Contact WHERE Id IN :contactIds];
        System.Debug(cons);
        for (Panel__c p: panels) {
            Contact con; Integer i = 0;
            while (con == null && i < cons.size()) {
                System.Debug('wait');
                if (cons[i].Id == p.Contact__c){
                    con = cons[i];
                }
                i++;
            }
            p.Panel_Round__c = con.Panels__r.size() + 1;
        }
    }
}