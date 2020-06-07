public with sharing class NewProjectCreationController {
    @AuraEnabled(Cacheable = true)
    public static List<PicklistOption> getPrimaryObjectiveFieldValues() {
        List<PicklistOption> options = new List<PicklistOption>();

        Schema.DescribeFieldResult fieldResult = Project__c.Primary_Objective__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry f : ple)
        {
            options.add(new PicklistOption(f.getLabel(), f.getValue()));
        }

        return options;
    }

    public class PicklistOption {
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String value {get; set;}

        public PicklistOption(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}