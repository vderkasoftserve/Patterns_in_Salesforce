({
    assignOptions: function (component, event) {
        let options = [
            {
                label: 'United Oil & Gas, Singapore',
                sublabel: '(650) 450-8810',
                value: '0013X00002bueKSQAY'
            },
            {
                label: 'Grand Hotels & Resorts Ltd',
                sublabel: '(312) 596-1000',
                value: '0013X00002bueKNQAY'
            }
        ];

        let dummyOptions = [];
        for (let i = 1; i <= 100; i++) {
            let option = {
                label: 'Dummy Option Label ' + i,
                sublabel: 'Dummy Option Sublabel ' + i,
                value: 'Dummy Option Value ' + i
            };
            dummyOptions.push(option);
        }

        let result = options.concat(dummyOptions);
        component.set("v.options", result);
    },

    createLookup: function (component, event) {
        $A.createComponent(
            "c:CustomLookupWrapper",
            {
                fieldName: 'Test field Name',
                value: component.getReference("v.value"),
                options: component.getReference("v.options"),
                label: "Custom Lookup",
                required: true,
                allowMultiSelect: true
            },
            function(lookup, status, errorMessage){
                if (status === "SUCCESS") {
                    let body = component.get("v.body");
                    body.push(lookup);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    handleQueryChange: function (component, event) {
        let query = event.getParam("query");

        let options = component.get("v.options");
        let optionsToAdd = [
            {
                label: 'Dickenson plc',
                sublabel: '(785) 241-6200',
                value: '0013X00002bueKMQAY'
            },
            {
                label: 'Edge Communications',
                sublabel: '(512) 757-6000',
                value: '0013X00002bueKJQAY'
            },
            {
                label: 'GenePoint',
                sublabel: '(650) 867-3450',
                value: '0013X00002bueKTQAY'
            }
        ];

        if (query) {
            if (query === 'No matches') {
                component.set("v.options", []);
            } else {
                let mergedOptions = optionsToAdd.concat(options).splice(0, 50);
                component.set("v.options", mergedOptions);
            }
        } else {
            this.assignOptions(component, event);
        }
    },

    closeModal: function(component) {
        component.set('v.isModalShown', false);
    },

    openModal: function(component) {
        component.set('v.isModalShown', true);
    }
});