import { LightningElement, track, api, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CHANNEL_POST_OBJECT from '@salesforce/schema/Channel_Post__c';
import CHANNEL_POST_CHANNEL from '@salesforce/schema/Channel_Post__c.Channel__c';
import CHANNEL_POST_MESSAGE from '@salesforce/schema/Channel_Post__c.Message__c';

import getFeedItemsForRunningUser from '@salesforce/apex/FollowedContentController.getFeedItemsForRunningUser';

export default class Channel extends LightningElement {
    @api recordId;
    @track inputMessage = '';
    @track feedItems = [];

    handleInput = (event) => {
        this.inputMessage = event.target.value;
    }

    handlePost = () => {
        const fields = {};
        fields[CHANNEL_POST_MESSAGE.fieldApiName] = this.inputMessage;
        fields[CHANNEL_POST_CHANNEL.fieldApiName] = this.recordId;

        const recordInput = { apiName: CHANNEL_POST_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(post => {
                this.inputMessage = '';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'You created the post!',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                console.error('Error while creating current channel feed item: ' + error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating post',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    @wire(getFeedItemsForRunningUser)
    fetchFeedItems({error, data}) {
        if(data) {
            this.feedItems = data;
        }
        else if(error) {
            console.error('Error while fetching current channel feed items: ' + error);
        }
    }
}