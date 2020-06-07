import { LightningElement, api } from 'lwc';

export default class AIQcoCustomLookupInput extends LightningElement {

    query;
    isFocused = false;

    @api
    get isInputFocused() {
        return this.isFocused;
    }

    handleSearch = (event) => {
        this.query = event.target.value;
        this.fireSearchQueryChangeEvent();
    }

    fireSearchQueryChangeEvent = () => {
        const searchQueryChange = new CustomEvent('searchquerychange', {
            detail: {query: this.query}
        });
        this.dispatchEvent(searchQueryChange);
    }

    handleInputFocus = () => {
        this.isFocused = true;
        this.dispatchEvent(new CustomEvent('inputfocus'));
    }

    handleInputBlur = () => {
        this.isFocused = false;
        this.dispatchEvent(new CustomEvent('inputblur'));
    }
}