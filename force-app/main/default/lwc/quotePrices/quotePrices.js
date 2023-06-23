import { LightningElement, track, api } from "lwc";
import images from "@salesforce/resourceUrl/PetInsImage";
import fetchPlanDetails from "@salesforce/apex/CapPetPlans.getPlanDetails";

export default class QuotePrices extends LightningElement {
  checkImg = images + "/PetInsImage/Vector-check.png";
  xImg = images + "/PetInsImage/Vector-x.png";

  essImg = images + "/PetInsImage/DogEssential.png";
  plusImg = images + "/PetInsImage/Dog-Plus.png";
  eliteImg = images + "/PetInsImage/Dog-Elite.png";
  @api ptype;
  @api petage;
  @api petbreed;
  @api petGender = "M";
  @track planDetails;
  covered = images + "/PetInsImage/Vector-check.png";
  notcovered = images + "/PetInsImage/Vector-x.png";
  connectedCallback() {
    if (this.ptype == "Dog") {
      this.essImg = images + "/PetInsImage/DogEssential.png";
      this.plusImg = images + "/PetInsImage/Dog-Plus.png";
      this.eliteImg = images + "/PetInsImage/Dog-Elite.png";
    } else {
      this.essImg = images + "/PetInsImage/cat_essential.png";
      this.plusImg = images + "/PetInsImage/cat_plus.png";
      this.eliteImg = images + "/PetInsImage/cat_elite.png";
    }

    this.getPlanDetails();
  }

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
  getPlanDetails() {
    console.log("Inside getPlanDetails..");
    console.log(
      "pettype",
      this.ptype,
      this.petage,
      this.petbreed,
      this.petGender
    );

    fetchPlanDetails({
      petType: this.ptype,
      petAge: this.petage,
      petBreed: this.petbreed,
      gender: this.petGender
    })
      .then((result) => {
        console.log("result ===> " + result);
        this.planDetails = result;
      })
      .catch((error) => {
        console.log("xxxxxxxxxx");
        // this.error = error;
        console.log(error);
        console.log("Inside error::" + error.message);
      });
  }
}
