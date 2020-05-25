public with sharing class ChannelController {
    @AuraEnabled(Cacheable = true)
    public static List<ItemWrapper> getFeedItems(Id channelId) {
        List<ItemWrapper> result = new List<ItemWrapper>();

        for (Channel_Post__c post : new FeedItemsService().getChannelPostsByChannelId(channelId)) {
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