import { LightningElement, api, track } from 'lwc';

export default class AiQcoCustomLookup extends LightningElement {
    @api fieldName;
    @api label;
    @api required = false;
    @api allowMultiSelect = false;

    @track isResultShown = false;

    values = [];
    isInputBlurred;
    timeOut;
    optionItems = [];

    get options() {
        return this.optionItems;
    }

    @api
    set options(value) {
        if (value.length === 0) {
            value = [{label: 'No matches found.'}];
        }
        this.optionItems = value;
    }

    handleSearchQueryChange = (event) => {
        this.options = [{label: 'Loading...'}];

        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
                const searchQueryChange = new CustomEvent('searchquerychange', {
                    detail: {query: event.detail.query}
                });
                this.dispatchEvent(searchQueryChange);
            }, 2000
        );
    }

    handleItemCheck = (event) => {
        this.values.push(event.detail.option.value);

        this.fireValueChangeEvent();
    }

    handleItemUncheck = (event) => {
        const index = this.values.indexOf(event.detail.option.value);
        if (index > -1) {
            this.values.splice(index, 1);
        }

        this.fireValueChangeEvent();
    }

    fireValueChangeEvent = () => {
        const valueChange = new CustomEvent('valuechange', {
            detail: {value: this.values}
        });
        this.dispatchEvent(valueChange);
    }

    handleLookupBlur = () => {
        setTimeout(() => {
                let isInputFocused = this.template.querySelector('c-custom-lookup-input').isInputFocused;
                let isResultFocused = this.template.querySelector('c-custom-lookup-result').isResultFocused;

                if (!isInputFocused && !isResultFocused) {
                    this.isResultShown = false;
                } else if (isResultFocused) {
                    this.template.querySelector('.slds-combobox_container').focus();
                }
            }, 100
        );
    }

    handleInputFocus = () => {
        this.isResultShown = true;
    }

    handleInputBlur = () => {
        setTimeout(() => {
                let isResultFocused = this.template.querySelector('c-custom-lookup-result').isResultFocused;

                if (!isResultFocused) {
                    this.isResultShown = false;
                } else {
                    this.template.querySelector('.slds-combobox_container').focus();
                }
            }, 100
        );
    }
}