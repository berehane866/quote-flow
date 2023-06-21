import { LightningElement, api } from "lwc";
import images from "@salesforce/resourceUrl/petFlowImgs";
export default class PetBreed extends LightningElement {
  imgUrl = images + "/flowImages/pet.png";
  @api petType;
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
  handleBreedChange() {}

  handleAgeChange() {}

  goToNext() {
    this.dispatchEvent(
      new CustomEvent("nextpetbreed", {
        detail: { petbreed: "German Shepherd", age: "3", step: "4" }
      })
    );
  }
  goToPrevious() {
    this.dispatchEvent(
      new CustomEvent("prevpetbreed", {
        detail: { petbreed: "German Shepherd", age: "3", step: "2" }
      })
    );
  }
}
