public with sharing class FeedItemsService {
    public List<Channel_Post__c> getChannelPostsLinkedToRunningUser() {
        return [
                SELECT Channel__r.Name, Message__c
                FROM Channel_Post__c
                WHERE Channel__c IN (SELECT Channel__c FROM Subscription__c WHERE User__c = :UserInfo.getUserId())
                ORDER BY CreatedDate DESC
        ];
    }

    public List<Channel_Post__c> getChannelPostsByChannelId(Id channelId) {
        return [
                SELECT Channel__r.Name, Message__c
                FROM Channel_Post__c
                WHERE Channel__c = :channelId
                ORDER BY CreatedDate DESC
        ];
    }

    public Channel_Post__c getChannelPostsById(Id itemId) {
        return [
                SELECT Channel__r.Name, Message__c
                FROM Channel_Post__c
                WHERE Id = :itemId
                LIMIT 1
        ];
    }
}