import { LightningElement, track, api, wire } from 'lwc';

import getFeedItemsForRunningUser from '@salesforce/apex/FollowedContentController.getFeedItemsForRunningUser';

export default class FollowedContent extends LightningElement {
    @track feedItems = [];

    @wire(getFeedItemsForRunningUser)
    fetchFeedItems({error, data}) {
        if(data) {
            this.feedItems = data;
        }
        else if(error) {
            console.error('Error while fetching current user feed items: ' + error);
        }
    }
}