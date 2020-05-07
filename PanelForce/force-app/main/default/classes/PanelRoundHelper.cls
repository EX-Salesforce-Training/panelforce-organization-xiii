public class PanelRoundHelper {
    public static void incrementPanelRound(List<Panel__c> panels) {
        List<Id> contactIds = new List<Id>();
        for (Panel__c p: panels)
            contactIds.add(p.Contact__c);
        List<Contact> cons = [SELECT Id, (SELECT Id FROM Panels__r) FROM Contact WHERE Id IN :contactIds];
        for (Panel__c p: panels) {
            Contact con; Integer i = 0;
            while (con == null && i < cons.size()) {
                if (cons[i].Id == p.Contact__c)
                    con = cons[i];
                i++;
            }
            p.Panel_Round__c = con.Panels__r.size() + 1;
        }
    }
}