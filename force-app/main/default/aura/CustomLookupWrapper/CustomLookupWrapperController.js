({
    doInit: function (component, event, helper) {
        helper.handleOptionsMaxLength(component, event);
    },

    handleSearchQueryChange: function (component, event, helper) {
        helper.fireSearchQueryEvent(component, event);
    },

    handleValuechange: function (component, event, helper) {
        helper.updateValue(component, event);
    }
});