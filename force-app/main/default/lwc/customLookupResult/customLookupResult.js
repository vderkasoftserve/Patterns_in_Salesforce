import { LightningElement, api, track } from 'lwc';

export default class AIQcoCustomLookupResult extends LightningElement {
    @track items = [];

    options = [];
    isFocused = false;
    isSingleOptionChecked = false;
    allowMultiSelect = false;
    values = [];

    @api
    get isResultFocused() {
        return this.isFocused;
    }

    get value() {
        return this.values;
    }

    @api
    set value(value) {
        this.values = value;

        if (! this.allowMultiSelect && this.values.length > 0) {
            this.isSingleOptionChecked = true;
        }
    }

    get ismultiselect() {
        return this.allowMultiSelect;
    }

    @api
    set ismultiselect(value) {
        this.allowMultiSelect = value;
    }

    get result() {
        return this.options;
    }

    @api
    set result(value) {
        this.options = value;
        this.items = [];

        this.options.forEach((option) => {
            let isChecked = this.values.includes(option.value);
            this.items.push({isChecked, option});
        });
    }

    handleItemCheck = (event) => {
        if (this.allowMultiSelect) {
            this.fireCheckedItem(event);
        } else if (! this.isSingleOptionChecked) {
            this.fireCheckedItem(event);
            this.isSingleOptionChecked = true;
        }
    }

    fireCheckedItem = (event) => {
        const itemCheck = new CustomEvent('itemcheck', {
            detail: event.detail
        });
        this.dispatchEvent(itemCheck);
    }

    handleItemUncheck = (event) => {
        if (this.allowMultiSelect) {
            this.fireUncheckedItem(event);
        } else if (this.isSingleOptionChecked) {
            this.fireUncheckedItem(event);
            this.isSingleOptionChecked = false;
        }
    }

    fireUncheckedItem = (event) => {
        const itemUncheck = new CustomEvent('itemuncheck', {
            detail: event.detail
        });
        this.dispatchEvent(itemUncheck);
    }

    handleResultFocus = () => {
        this.isFocused = true;
    }

    handleResultBlur = () => {
        this.isFocused = false;
    }
}