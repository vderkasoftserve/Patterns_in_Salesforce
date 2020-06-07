({
    doInit: function (component, event, helper) {
        helper.assignOptions(component, event);
        helper.createLookup(component, event);
    },

    handleQueryChange: function (component, event, helper) {
        helper.handleQueryChange(component, event);
    },

    closeModal: function(component, event, helper) {
        helper.closeModal(component);
    },

    openModal: function(component, event, helper) {
        helper.openModal(component);
    },

    handleValueChange: function(component, event, helper) {
        console.log('values in lookup test on change: ' + JSON.stringify(component.get("v.value")));
    }
});