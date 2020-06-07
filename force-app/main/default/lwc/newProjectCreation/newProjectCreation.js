import { LightningElement, api, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import { createRecord } from "lightning/uiRecordApi";
import getPrimaryObjectiveFieldValues from "@salesforce/apex/NewProjectCreationController.getPrimaryObjectiveFieldValues";

import PROJECT_OBJECT from "@salesforce/schema/Project__c";

export default class NewProjectCreation extends NavigationMixin(LightningElement) {
	@track isModalShown = true;
	@track primaryObjectives = [];
	@track isRequiredBusinessValueShown = false;
	@track isRequiredRiskReductionBenefitShown = false;
	@track isRequiredCommentOnWhyEmergingWorkShown = false;

	fieldsForCreation = {};
	validator;
	_project;
	projectProxy;
	isSaveAlreadyInitiated = false;

	constructor() {
		super();
		this.validator = this.getValidator();
		this._project = {};
		this.projectProxy = new Proxy(this._project, this.validator);
	}

	closeModal = () => {
		this.isModalShown = false;
		this.redirectToProjectsListView();
	};

	redirectToProjectsListView = () => {
		this[NavigationMixin.Navigate]({
			type: "standard__objectPage",
			attributes: {
				objectApiName: "Project__c",
				actionName: "list"
			}
		});
	};

	handleSave = () => {
		if (this.isSaveAlreadyInitiated) {
			return;
		}

		this.isSaveAlreadyInitiated = true;
		const allValid = [
			...this.template.querySelectorAll('lightning-input'),
			...this.template.querySelectorAll('lightning-combobox'),
			...this.template.querySelectorAll('lightning-textarea')
		].reduce((validSoFar, inputCmp) => {
			inputCmp.reportValidity();
			return validSoFar && inputCmp.checkValidity();
		}, true);

		if (!allValid) {
			this.showToast('Warning!', 'Please review all the warning messages present on the page.', 'warning');
			this.isSaveAlreadyInitiated = false;
			return;
		}

		this.createProject();
	};

	createProject = () => {
		const recordToCreate = { apiName: PROJECT_OBJECT.objectApiName, fields: this._project };
		createRecord(recordToCreate)
			.then(project => {
				this.showToast("Success!", "Project was successfully created!", "success");
				this.redirectToProjectsListView();
			})
			.catch(error => {
				this.isSaveAlreadyInitiated = false;
				this.showToast("Error creating project!", error.body.message, "error");
				console.error("Error occured while creating project record: " + error);
			});
	};

	showToast = (title, message, variant) => {
		const evt = new ShowToastEvent({
			title: title,
			message: message,
			variant: variant
		});
		this.dispatchEvent(evt);
	};

	@wire(getPrimaryObjectiveFieldValues)
	fetchPrimaryObjectiveFieldValues({ error, data }) {
		if (data) {
			this.primaryObjectives = data;
		} else if (error) {
			console.error("Error occured while fetching primary objective field values: " + error);
		}
	}

	getValidator = () => {
		return {
			set: (obj, prop, value) => {
				if (prop === "Name") {
					if (value.length > 80) {
						let nameCmp = this.template.querySelector(".project-name");
						nameCmp.setCustomValidity("Name length cannot be longer than 80 characters.");
						nameCmp.value = nameCmp.value.slice(0, 80);
						nameCmp.reportValidity();
					}
				} else if (prop === "Primary_Objective__c") {
					if (value === 'Revenue') {
						this.isRequiredBusinessValueShown = true;
						this.isRequiredRiskReductionBenefitShown = false;
					} else if (value === 'Risk Reduction') {
						this.isRequiredRiskReductionBenefitShown = true;
						this.isRequiredBusinessValueShown = false;
					} else {
						this.isRequiredBusinessValueShown = false;
						this.isRequiredRiskReductionBenefitShown = false;
					}
				} else if (prop === "Is_Emerging_Work__c") {
					if (value) {
						this.isRequiredCommentOnWhyEmergingWorkShown = true;
					} else {
						this.isRequiredCommentOnWhyEmergingWorkShown = false;
					}
				}

				obj[prop] = value;
				return true;
			}
		};
	};

	handleNameInputBlur = () => {
		let nameCmp = this.template.querySelector(".project-name");
		nameCmp.setCustomValidity("");
		nameCmp.validity = { valid: true, badInput: false };
		nameCmp.reportValidity();
		nameCmp.blur();
	};

	handleNameChange = (event) => {
		this.projectProxy.Name = event.detail.value;
	};

	handlePrimaryObjectiveChange = (event) => {
		this.projectProxy.Primary_Objective__c = event.detail.value;
	};

	handleBusinessValueChange = (event) => {
		this.projectProxy.Business_Value__c = event.detail.value;
	};

	handleEmergingWorkFlagChange = (event) => {
		this.projectProxy.Is_Emerging_Work__c = event.detail.checked;
	};

	handleRiskReductionBenefitChange = (event) => {
		this.projectProxy.Risk_Reduction_Benefit__c = event.detail.value;
	};

	handleCommentOnWhyEmergingWorkChange = (event) => {
		this.projectProxy.Comment_on_Why_Emerging_Work__c = event.detail.value;
	};
}