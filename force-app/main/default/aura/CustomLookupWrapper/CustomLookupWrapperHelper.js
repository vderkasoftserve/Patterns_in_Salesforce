({
    handleOptionsMaxLength: function (component, event){
        const OPTIONS_MAX_LENGTH = 100;
        let options = component.get("v.options");

        if (options.length > OPTIONS_MAX_LENGTH) {
            options = options.slice(0, OPTIONS_MAX_LENGTH);
        }
        component.set("v.options", options);
    },

    fireSearchQueryEvent: function (component, event){
        let searchQueryEvent = component.getEvent("searchQueryChangeEvent");
        searchQueryEvent.setParams({
            query: event.getParam('query')
        });
        searchQueryEvent.fire();
    },

    updateValue: function (component, event){
        component.set("v.value", event.getParam('value'));
    }
});