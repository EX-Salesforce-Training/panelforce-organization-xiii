trigger PanelTrigger on Panel__c (after insert) {
    if (Trigger.isAfter && Trigger.isInsert)
        TopicMaker.createTopics(Trigger.new);
}