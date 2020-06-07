public with sharing class AccountActionsController {
    @AuraEnabled(Cacheable = false)
    public static void makeDeposit(Id accountId, Decimal depositAmount) {
        try{
            new CheckingAccountService(accountId).makeDeposit(depositAmount);
        } catch(DmlException ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(Cacheable = false)
    public static void withdraw(Id accountId, Decimal withdrawalAmount) {
        try{
            new CheckingAccountService(accountId).withdraw(withdrawalAmount);
        } catch(DmlException ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(Cacheable = false)
    public static void accrueInterest(Id accountId) {
        try{
            new CheckingAccountService(accountId).accrueInterest();
        } catch(DmlException ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}