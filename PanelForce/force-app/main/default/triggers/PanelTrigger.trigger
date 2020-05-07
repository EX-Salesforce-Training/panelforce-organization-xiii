trigger PanelTrigger on Panel__c (before insert, after insert) {
    if (Trigger.isAfter && Trigger.isInsert)
        TopicMaker.createTopics(Trigger.new);
    else if (Trigger.isBefore && Trigger.isInsert)
        PanelRoundHelper.incrementPanelRound(Trigger.new);
}