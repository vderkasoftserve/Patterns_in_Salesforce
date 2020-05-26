public with sharing class NotificationManager {
    public static void notifyUsers(Set<String> userIds, String message, Id customNotificationTypeId) {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()
                + '/services/data/v46.0/actions/standard/customNotificationAction');
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setHeader('Content-Type', 'application/json');
        CustomNotificationActionInput input = new CustomNotificationActionInput();
        input.customNotifTypeId = customNotificationTypeId;
        input.recipientIds = new List<String>(userIds);
        input.title = 'New post was published!';
        input.body = message;
        input.targetId = customNotificationTypeId;
        CustomNotificationAction action = new CustomNotificationAction();
        action.inputs = new List<CustomNotificationActionInput>{input};
        req.setBody(JSON.serialize(action));
        HttpResponse res = h.send(req);
        System.debug(res.getBody());
    }

    public class CustomNotificationAction {
        public List<CustomNotificationActionInput> inputs { get; set; }
    }

    public class CustomNotificationActionInput {
        public String customNotifTypeId { get; set; }
        public List<String> recipientIds { get; set; }
        public String title { get; set; }
        public String body { get; set; }
        public String targetId { get; set; }
    }

    @future (callout=true)
    public static void notifyChannelSubscribers(Set<String> userIds, String message) {
        Id customNotificationTypeId = [SELECT Id FROM CustomNotificationType WHERE DeveloperName = 'New_Post_Published' LIMIT 1].Id;
        notifyUsers(userIds, message, customNotificationTypeId);
    }
}