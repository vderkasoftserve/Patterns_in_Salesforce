public with sharing class CheckingAccountService {
    private AccountState accountState;

    public CheckingAccountService(Id accountId) {
        Checking_Account__c acc = [SELECT Balance__c FROM Checking_Account__c WHERE Id = :accountId LIMIT 1];
        accountState = getAccountState(acc);
    }

    private AccountState getAccountState(Checking_Account__c acc) {
        if (acc.Balance__c < OverdrawnAccountState.UPPER_LIMIT) {
            return new OverdrawnAccountState(acc);
        } else if (acc.Balance__c >= ZeroInterestAccountState.LOWER_LIMIT && acc.Balance__c < ZeroInterestAccountState.UPPER_LIMIT) {
            return new ZeroInterestAccountState(acc);
        } else {
            return new InterestAccountState(acc);
        }
    }

    public void makeDeposit(Decimal depositAmount) {
        accountState.deposit(depositAmount);
    }

    public void withdraw(Decimal withdrawalAmount) {
        accountState.withdraw(withdrawalAmount);
    }

    public void accrueInterest() {
        accountState.accrueInterest();
    }
}