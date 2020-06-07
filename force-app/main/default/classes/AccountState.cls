public abstract class AccountState {
    public Decimal interestRate;
    public Decimal lowerLimit;
    public Decimal upperLimit;

    public Checking_Account__c accountRecord;

    public abstract void accrueInterest();
    public abstract void deposit(Decimal amount);
    public abstract void withdraw(Decimal amount);
}