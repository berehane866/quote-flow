import { LightningElement } from "lwc";
import images from "@salesforce/resourceUrl/PetInsImage";

export default class QuotePrices extends LightningElement {
  checkImg = images + "/PetInsImage/Vector-check.png";
  xImg = images + "/PetInsImage/Vector-x.png";

  essImg = images + "/PetInsImage/DogEssential.png";
  plusImg = images + "/PetInsImage/Dog-Plus.png";
  eliteImg = images + "/PetInsImage/Dog-Elite.png";

  connectedCallback() {}

  essentials = [
    { Name: "Accident", covered: true },
    { Name: "Illness", covered: true },
    { Name: "Emergency Care", covered: true },
    { Name: "Cancer", covered: false },
    { Name: "Surgeries & Rx Meds", covered: false },
    { Name: "Accident & Illness Exam Fees", covered: false },
    {
      Name: "Rehabilitative, Acupuncture & Chiropractic Coverage cross",
      covered: false
    }
  ];

  plus = [
    { Name: "Accident", covered: true },
    { Name: "Illness", covered: true },
    { Name: "Emergency Care", covered: true },
    { Name: "Cancer", covered: true },
    { Name: "Surgeries & Rx Meds", covered: true },
    { Name: "Accident & Illness Exam Fees", covered: false },
    {
      Name: "Rehabilitative, Acupuncture & Chiropractic Coverage cross",
      covered: false
    }
  ];

  elite = [
    { Name: "Accident", covered: true },

    { Name: "Illness", covered: true },
    { Name: "Emergency Care", covered: true },
    { Name: "Cancer", covered: true },
    { Name: "Surgeries & Rx Meds", covered: true },
    { Name: "Accident & Illness Exam Fees", covered: true },
    {
      Name: "Rehabilitative, Acupuncture & Chiropractic Coverage cross",
      covered: true
    }
  ];

  selectPlan(evt) {
    let username = this.template.querySelector(
      "lightning-card[data-id=essential]"
    );
    username.className = "boxshadow";
  }

  goToPrevious() {
    this.dispatchEvent(
      new CustomEvent("prevquoteprices", { detail: { step: "4" } })
    );
  }
}
