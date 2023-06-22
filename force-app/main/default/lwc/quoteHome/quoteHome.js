import { LightningElement, api, track } from "lwc";
import images from "@salesforce/resourceUrl/petFlowImgs";
import QUOTE_OBJECT from "@salesforce/schema/Quote";
import QUOTE_ZipCode from "@salesforce/schema/Quote.Pet_Zip_Code__c";
import QUOTE_PetAge from "@salesforce/schema/Quote.Pet_Age__c";
import QUOTE_PetBreed from "@salesforce/schema/Quote.Pet_Breed__c";
import QUOTE_PetName from "@salesforce/schema/Quote.Pet_Name__c";
import QUOTE_PetType from "@salesforce/schema/Quote.Pet_Type__c";
import QUOTE_Email from "@salesforce/schema/Quote.Email";
import saveQuote from "@salesforce/apex/QuoteController.saveQuoteInfo";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

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

  @track
  currentquote = {
    Pet_Zip_Code__c: QUOTE_ZipCode,
    Pet_Age__c: QUOTE_PetAge,
    Pet_Breed__c: QUOTE_PetBreed,
    Pet_Name__c: QUOTE_PetName,
    Pet_Type__c: QUOTE_PetType,
    Email: QUOTE_Email
  };

  petType = "Dog";

  CLASS_BUTTON_ACTIVE = "slds-button slds-button_brand";
  CLASS_BUTTON_INACTIVE = "slds-button slds-button_neutral";
  isDog = true;
  isCat = false;
  dogClassBtn = this.CLASS_BUTTON_ACTIVE;
  catClassBtn = this.CLASS_BUTTON_INACTIVE;

  connectedCallback() {
    this.currentquote.Pet_Type__c = this.petType;
  }

  get petsbreed() {
    if (this.petType === "Dog") {
      return [
        { label: "German Shepherd", value: "German Shepherd" },
        { label: "Labrador Retriever", value: "Labrador Retriever" },
        { label: "Pug", value: "Pug" },
        { label: "Bulldog", value: "Bulldog" },
        { label: "Dingo", value: "Dingo" },
        { label: "Golden Retriever", value: "Golden Retriever" },
        { label: "Chihuahua", value: "Chihuahua" },
        { label: "Dalmacian", value: "Dalmacian" },
        { label: "Siberian Husky", value: "Siberian Husky" }
      ];
    }

    return [
      { label: "Persian Cat", value: "Persian Cat" },
      { label: "Birman", value: "Birman" }
    ];
  }

  get petsage() {
    return [
      { label: "0-1 Year", value: "0" },
      { label: "1 Year", value: "1" },
      { label: "2 Years", value: "2" },
      { label: "3 Years", value: "3" },
      { label: "4 Years", value: "4" },
      { label: "5 Years", value: "5" },
      { label: "6 Years", value: "6" },
      { label: "7 Years", value: "7" },
      { label: "8 Years", value: "8" },
      { label: "9 Years", value: "9" },
      { label: "10 Years", value: "10" }
    ];
  }

  prevQuotePricesHandler(event) {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = true;
    this.showQuotePrices = false;
    this.currentStep = "4";
    this.contactEmail = event.target.value;
  }

  goToNextZipCode() {
    this.showZipCode = false;
    this.showPetInfo = true;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "2";
  }

  goToNextPetInfo() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = true;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "3";
  }

  goToPrevPetBreed() {
    this.showZipCode = false;
    this.showPetInfo = true;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "2";
  }

  handleZipChange(event) {
    this.currentquote.Pet_Zip_Code__c = event.target.value;
  }

  handlePetNameChange(event) {
    this.currentquote.Pet_Name__c = event.target.value;
  }

  handleBreedChange(event) {
    this.currentquote.Pet_Breed__c = event.target.value;
  }

  handleAgeChange(event) {
    this.currentquote.Pet_Age__c = event.target.value;
  }

  handlePetTypeClick(event) {
    let name = event.target.name;
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
    this.currentquote.Pet_Type__c = name;
    this.petType = name;
  }
  goToPrevPetInfo() {
    this.showZipCode = true;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "1";
  }

  goToNextPetBreed() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = true;
    this.showQuotePrices = false;
    this.currentStep = "4";
    console.log(JSON.stringify(this.currentquote));
  }

  onEmailChange(event) {
    this.currentquote.Email = event.target.value;
  }

  goToNextEmail() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = false;
    this.showEmail = false;
    this.showQuotePrices = true;
    this.currentStep = "5";
    saveQuote({ qt: this.currentquote })
      .then((result) => {
        this.currentquote = {};
        console.log(result);
        // Show success messsage
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success!!",
            message: "Account Created Successfully!!",
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  goToPrevEmail() {
    this.showZipCode = false;
    this.showPetInfo = false;
    this.showPetBreed = true;
    this.showEmail = false;
    this.showQuotePrices = false;
    this.currentStep = "3";
  }
}
