public with sharing class ChannelPostService {
    public void notifySubscribers(List<Channel_Post__c> posts) {
        Set<Id> channelIds = new Set<Id>();
        for (Channel_Post__c post : posts) {
            channelIds.add(post.Channel__c);
        }

        List<Subscription__c> subscriptions = [SELECT User__c FROM Subscription__c WHERE Channel__c IN :channelIds];

        Set<String> userIds = new Set<String>();
        for (Subscription__c subscription : subscriptions) {
            userIds.add(subscription.User__c);
        }

        String message = 'A new post arrived in your subscriptions. Review your followed items.';
        NotificationManager.notifyChannelSubscribers(userIds, message);
    }
}