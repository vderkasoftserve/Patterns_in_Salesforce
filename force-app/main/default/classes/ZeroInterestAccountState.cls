public with sharing class ZeroInterestAccountState extends AccountState {
    private static final Decimal INTEREST_RATE = 0;
    public static final Decimal LOWER_LIMIT = 0;
    public static final Decimal UPPER_LIMIT = 1000;

    public ZeroInterestAccountState(Checking_Account__c acc) {
        this.accountRecord = acc;
    }

    public override void deposit(Decimal amount) {
        accountRecord.Balance__c += amount;
        update accountRecord;
    }

    public override void accrueInterest() {
        Decimal accruedInterest = INTEREST_RATE * accountRecord.Balance__c;
        accountRecord.Balance__c += accruedInterest;
        update accountRecord;
    }

    public override void withdraw(Decimal amount) {
        accountRecord.Balance__c -= amount;
        update accountRecord;
    }
}