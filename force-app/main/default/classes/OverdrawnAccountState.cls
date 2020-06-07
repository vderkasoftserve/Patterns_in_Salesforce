public with sharing class OverdrawnAccountState extends AccountState {
    private static final Decimal INTEREST_RATE = 0;
    public static final Decimal LOWER_LIMIT = -1000;
    public static final Decimal UPPER_LIMIT = 0;

    public OverdrawnAccountState(Checking_Account__c acc) {
        this.accountRecord = acc;
    }

    public override void deposit(Decimal amount) {
        accountRecord.Balance__c += amount;
        update accountRecord;
    }

    public override void accrueInterest() {
        throw new CheckingAccountException('No interest can be accrued if the balance is overdrawn.');
    }

    public override void withdraw(Decimal amount) {
        throw new CheckingAccountException('Unable to withdraw the amount due to lack of funds.');
    }
}