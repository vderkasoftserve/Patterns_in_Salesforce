import { LightningElement, track, api } from 'lwc';
import {ShowToastEvent} from "lightning/platformShowToastEvent";

import makeDeposit from '@salesforce/apex/AccountActionsController.makeDeposit';
import withdraw from '@salesforce/apex/AccountActionsController.withdraw';
import accrueInterest from '@salesforce/apex/AccountActionsController.accrueInterest';

const inputTypes = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw'
};

export default class AccountActions extends LightningElement {
  @api recordId;
  @track showModal = false;
  @track inputLabel = '';

  amount = 0;
  inputType = '';

  openModal = () => {
    this.showModal = true;
  };

  handleCancel = () => {
    this.showModal = false;
  };

  handleDeposit = () => {
    this.inputType = inputTypes.DEPOSIT;
    this.inputLabel = 'Enter the deposit amount.';
    this.openModal();
  };

  handleWithdraw = () => {
    this.inputType = inputTypes.WITHDRAW;
    this.inputLabel = 'Enter the amount of withdrawal.';
    this.openModal();
  }

  handleInterestAccrual = () => {
    this.accrueInterest();
  }

  handleAmountChange = (e) => {
    this.amount = e.detail.value;
  }

  handleSave = () => {
    switch(this.inputType){
      case inputTypes.DEPOSIT:
        this.makeDeposit();
        break;
      case inputTypes.WITHDRAW:
        this.withdraw();
        break;
    }
  };

  makeDeposit = () => {
    makeDeposit({ accountId: this.recordId, depositAmount: this.amount })
      .then(() => {
        this.showToast(this, 'Success!', 'You have made the deposit!', 'success');
        this.handleCancel();
      })
      .catch(error => {
        this.showToast(this, 'Attempt to make the deposit failed!', this.getErrorMessage(error), 'error');
        this.handleCancel();
      });
  }

  withdraw = () => {
    withdraw({ accountId: this.recordId, withdrawalAmount: this.amount })
      .then(() => {
        this.showToast(this, 'Success!', 'You have made the withdrawal!', 'success');
        this.handleCancel();
      })
      .catch(error => {
        this.showToast(this, 'Attempt to withdraw failed!', this.getErrorMessage(error), 'error');
        this.handleCancel();
      });
  }

  accrueInterest = () => {
    accrueInterest({ accountId: this.recordId })
      .then(() => {
        this.showToast(this, 'Success!', 'You have accrued the interest!', 'success');
        this.handleCancel();
      })
      .catch(error => {
        this.showToast(this, 'Attempt to accrue the interest failed!', this.getErrorMessage(error), 'error');
        this.handleCancel();
      });
  }

  showToast = (context, title, message, variant) => {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    context.dispatchEvent(evt);
  }

  getErrorMessage = (error) => {
    if (error) {
      if (Array.isArray(error.body)) {
        return error.body.map(e => e.message).join(', ');
      } else if (error.body && error.body.message && typeof error.body.message === 'string') {
        return error.body.message;
      } else {
        console.log('Error: ' + JSON.stringify(error));
        return null;
      }
    } else {
      return null;
    }
  }
}