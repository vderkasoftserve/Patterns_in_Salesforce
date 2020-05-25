public with sharing class FollowedContentController {
    @AuraEnabled(Cacheable = true)
    public static List<ItemWrapper> getFeedItemsForRunningUser() {
        List<ItemWrapper> result = new List<ItemWrapper>();

        for (Channel_Post__c post : new FeedItemsService().getChannelPostsLinkedToRunningUser()) {
            result.add(new ItemWrapper(post.Channel__r.Name, post.Message__c));
        }

        return result;
    }

    public class ItemWrapper {
        @AuraEnabled
        public String channelName { get; set; }
        @AuraEnabled
        public String message { get; set; }

        public ItemWrapper(String channelName, String message) {
            this.channelName = channelName;
            this.message = message;
        }
    }
}