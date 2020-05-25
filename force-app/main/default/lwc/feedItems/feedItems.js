import { LightningElement, track, api } from 'lwc';

export default class FeedItems extends LightningElement {
    @api items = [];
}