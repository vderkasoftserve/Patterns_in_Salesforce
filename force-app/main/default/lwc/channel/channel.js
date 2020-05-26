import { LightningElement, track, api, wire } from 'lwc';

import { createRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CHANNEL_POST_OBJECT from '@salesforce/schema/Channel_Post__c';
import CHANNEL_POST_CHANNEL from '@salesforce/schema/Channel_Post__c.Channel__c';
import CHANNEL_POST_MESSAGE from '@salesforce/schema/Channel_Post__c.Message__c';

import getFeedItems from '@salesforce/apex/ChannelController.getFeedItems';
import getFeedItemById from '@salesforce/apex/ChannelController.getFeedItemById';

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
                this.template.querySelector('.slds-publisher__input').value = '';

                this.getFeedItem(post.id);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'You created the post!',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                console.error('Error while creating current channel feed item: ' + JSON.stringify(error));
            });
    }

    @wire(getFeedItems, { channelId: '$recordId' })
    fetchFeedItems({error, data}) {
        if(data) {
            this.feedItems = JSON.parse(JSON.stringify(data));
        }
        else if(error) {
            console.error('Error while fetching current channel feed items: ' + error);
        }
    }

    getFeedItem = (itemId) => {
      const FIELDS = [CHANNEL_POST_CHANNEL_NAME, CHANNEL_POST_MESSAGE];
      getFeedItemById({ itemId: itemId })
            .then(item => {
                let newlyCreatedItem = {
                  channelName: item.channelName,
                  message: item.message
                };
                this.feedItems.unshift(newlyCreatedItem);
            })
            .catch(error => {
                console.error('Error while fetching newly created record: ' + error);
            });
    }
}