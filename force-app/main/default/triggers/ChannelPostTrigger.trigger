trigger ChannelPostTrigger on Channel_Post__c (before insert,
    before update, before delete,
    after insert, after update,
    after delete, after undelete) {
    if (Trigger.isInsert && Trigger.isAfter) {
        new ChannelPostService().notifySubscribers(Trigger.new);
    }
}