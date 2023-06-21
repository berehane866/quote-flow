import { LightningElement, api } from "lwc";
//import ICONS from "@salesforce/resourceUrl/PetInsImage";

export default class PetTypeLWC extends LightningElement {
  CLASS_BUTTON_ACTIVE = "slds-button slds-button_brand";
  CLASS_BUTTON_INACTIVE = "slds-button slds-button_neutral";
  isDog = true;
  isCat = false;
  dogClassBtn = this.CLASS_BUTTON_ACTIVE;
  catClassBtn = this.CLASS_BUTTON_INACTIVE;
  @api qtRecord = {};
  @api petType;
  connectedCallback() {
    console.log("xxxxxxxxx", this.petType);
    if (this.petType) {
      console.log("yyyyyyy", this.petType);
      this.isDog = this.petType == "Dog" ? true : false;
      this.isCat = !this.isDog;
    }
    this.qtRecord.Pet_Type__c = this.isDog ? "Dog" : "Cat";
  }
  handleClick(event) {
    var name = event.target.name;
    this.isDog = false;
    this.isCat = false;
    this.dogClassBtn = this.CLASS_BUTTON_INACTIVE;
    this.catClassBtn = this.CLASS_BUTTON_INACTIVE;

    if (name === "Dog") {
      this.isDog = true;
      this.dogClassBtn = this.CLASS_BUTTON_ACTIVE;
    } else if (name === "Cat") {
      this.isCat = true;
      this.catClassBtn = this.CLASS_BUTTON_ACTIVE;
    }
    this.qtRecord.Pet_Type__c = this.isDog ? "Dog" : "Cat";
  }
}
