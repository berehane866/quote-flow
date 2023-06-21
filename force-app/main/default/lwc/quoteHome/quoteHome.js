import { LightningElement } from "lwc";
import images from "@salesforce/resourceUrl/petFlowImgs";
import QUOTE_OBJECT from "@salesforce/schema/Quote";
import QUOTE_ZipCode from "@salesforce/schema/Pet_Zip_Code__c";
import QUOTE_PetAge from "@salesforce/schema/Pet_Age__c";
import QUOTE_PetBreed from "@salesforce/schema/Pet_Breed__c	";
import QUOTE_PetName from "@salesforce/schema/Pet_Name__c";
import QUOTE_PetType from "@salesforce/schema/Pet_Type__c";
import QUOTE_PetCoverageType from "@salesforce/schema/Pet_Coverage_Type__c";

export default class QuoteHome extends LightningElement {
  showZipCode = true;
  showPetInfo = false;
  showPetBreed = false;
  showEmail = false;
  showQuotePrices = false;
  currentStep = "1";
  imgZipCodeUrl = images + "/flowImages/servlet.png";
  imgEmailUrl = images + "/flowImages/email.jfif";
  imgPetInfoUrl = images + "/flowImages/pet.png";
  imgPetBreedUrl = images + "/flowImages/breed.png";
  currentquote = {};
  zipcode;
  petname;
  CLASS_BUTTON_ACTIVE = "slds-button slds-button_brand";
  CLASS_BUTTON_INACTIVE = "slds-button slds-button_neutral";
  isDog = true;
  isCat = false;
  dogClassBtn = this.CLASS_BUTTON_ACTIVE;
  catClassBtn = this.CLASS_BUTTON_INACTIVE;

  nextPetInfoHandler(event) {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = true;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = event.detail.step;
  }

  prevPetInfoHandler(event) {
    this.showZipCode = true;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = event.detail.step;
    this.zipcode = this.currentquote[QUOTE_ZipCode];
  }

  nextPetBreedHandler(event) {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = true;
    this.showQuotePrices = false;
    this.currentStep = event.detail.step;
  }

  prevPetBreedHandler(event) {
    this.showZipCode = false;
    this.showPetInfo = true;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = event.detail.step;
  }

  goToQuotePrices() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = true;
    this.currentStep = "5";
  }

  prevQuotePricesHandler() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = true;
    this.showQuotePrices = false;
    this.currentStep = "4";
  }

  goToPetInfo() {
    this.showZipCode = false;
    this.showPetInfo = true;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "2";
    console.log("zipcode", this.zipcode);
    this.currentquote[QUOTE_ZipCode] = this.zipcode;
  }

  goToPetBreed() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = true;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "3";
  }

  goToPreviousZipCode() {
    this.showZipCode = true;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "1";
  }

  handleZipChange(event) {
    this.zipcode = event.target.value;
    this.currentquote[QUOTE_ZipCode] = this.zipcode;
  }

  handlePetNameChange(event) {
    this.petname = event.target.value;
    this.currentquote[QUOTE_PetName] = this.petname;
  }

  handlePetTypeClick(event) {
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
    this.currentquote[QUOTE_ZipCode] = name;
  }
  goToPrevPetInfo() {}
  goToNextEmail() {}
}
