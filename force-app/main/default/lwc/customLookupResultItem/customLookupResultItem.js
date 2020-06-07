import { LightningElement, api, track } from 'lwc';

export default class AIQcoCustomLookupResultItem extends LightningElement {
    @api isSingleOptionChecked = false;
    @api key;

    @track isItemChecked = false;

    resultItem = {};
    allowMultiSelect = false;

    get issingleoptionchecked() {
        return this.isSingleOptionChecked;
    }

    @api
    set issingleoptionchecked(value) {
        this.isSingleOptionChecked = value;
    }

    get ismultiselect() {
        return this.allowMultiSelect;
    }

    @api
    set ismultiselect(value) {
        this.allowMultiSelect = value;
    }

    get item() {
        return this.resultItem;
    }

    @api
    set item(value) {
        this.resultItem = value;
        this.isItemChecked = this.resultItem.isChecked;
    }

    renderedCallback() {
        if (this.isItemChecked) {
            this.showCheckIcon();
        } else {
            this.hideCheckIcon();
        }
    }

    handleItemClick = () => {
        if (this.isItemChecked) {
            this.handleItemUnCheck()
        } else {
            this.handleItemCheck();
        }
    }

    handleItemCheck = () => {
        if (this.allowMultiSelect || !this.isSingleOptionChecked) {
            this.showCheckIcon();
            this.fireCheckedItem();
            this.isItemChecked = true;
        }
    }

    handleItemUnCheck = () => {
        if (this.allowMultiSelect || this.isSingleOptionChecked) {
            this.hideCheckIcon();
            this.fireUncheckedItem();
            this.isItemChecked = false;
        }
    }

    fireCheckedItem = () => {
        const resultItemCheck = new CustomEvent('resultitemcheck', {
            detail: {option: this.resultItem.option}
        });
        this.dispatchEvent(resultItemCheck);
    }

    fireUncheckedItem = () => {
        const resultItemUncheck = new CustomEvent('resultitemuncheck', {
            detail: {option: this.resultItem.option}
        });
        this.dispatchEvent(resultItemUncheck);
    }

    showCheckIcon = () => {
        this.template.querySelector('.slds-icon-utility-check').classList.remove('slds-hidden');
    }

    hideCheckIcon = () => {
        this.template.querySelector('.slds-icon-utility-check').classList.add('slds-hidden');
    }
}