trigger PanelTrigger on Panel__c (after insert) {
    if (Trigger.isAfter && Trigger.isInsert)
        TopicMaker.createTopics(Trigger.new);
    else if (Trigger.isBefore && Trigger.isInsert)
        System.debug('Teehee');// Increment Panel Round
}