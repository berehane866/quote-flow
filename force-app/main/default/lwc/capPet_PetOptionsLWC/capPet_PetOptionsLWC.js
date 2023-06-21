import { track, LightningElement } from 'lwc';
import ICONS from '@salesforce/resourceUrl/PetInsImage';
import { NavigationMixin } from 'lightning/navigation';
export default class LwcPetOptions extends NavigationMixin(LightningElement) {
    CLASS_BUTTON_ACTIVE = 'slds-button slds-button_brand';
    CLASS_BUTTON_INACTIVE = 'slds-button slds-button_neutral';

    @track isDog = true;
    @track isCat = false;
    @track dogClassBtn = this.CLASS_BUTTON_ACTIVE;
    @track catClassBtn = this.CLASS_BUTTON_INACTIVE;

    dogEssentialOption = {
        title : 'Essential',
        img   : ICONS + "/PetInsImage/dog_essential.png",
        price : '$17.99/mo*',
        description: 'Optional benefits not included',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : false
            },
            {
                label : 'Surgeries & Rx Meds',
                value : false
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : false
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : false
            }
        ]
    };

    dogPlusOption = {
        title : 'Plus',
        img   : ICONS + "/PetInsImage/dog_plus.png",
        price : '$25.99/mo*',
        description: 'Includes coverage for Accident & Illness Exam Fees',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : true
            },
            {
                label : 'Surgeries & Rx Meds',
                value : true
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : false
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : false
            }
        ]
    };

    dogEliteOption = {
        title : 'Elite',
        img   : ICONS + "/PetInsImage/dog_elite.png",
        price : '$36.99/mo*',
        description: 'Includes coverage for Accident & Illness Exam Fees and Rehab',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : true
            },
            {
                label : 'Surgeries & Rx Meds',
                value : true
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : true
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : true
            }
        ]
    };

    catEssentialOption = {
        title : 'Essential',
        img   : ICONS + "/PetInsImage/cat_essential.png",
        price : '$15.99/mo*',
        description: 'Optional benefits not included',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : false
            },
            {
                label : 'Surgeries & Rx Meds',
                value : false
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : false
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : false
            }
        ]
    };

    catPlusOption = {
        title : 'Plus',
        img   : ICONS + "/PetInsImage/cat_plus.png",
        price : '$21.99/mo*',
        description: 'Includes coverage for Accident & Illness Exam Fees',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : true
            },
            {
                label : 'Surgeries & Rx Meds',
                value : true
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : false
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : false
            }
        ]
    };

    catEliteOption = {
        title : 'Elite',
        img   : ICONS + "/PetInsImage/cat_elite.png",
        price : '$30.99/mo*',
        description: 'Includes coverage for Accident & Illness Exam Fees and Rehab',
        options : [
            {
                label : 'Accident',
                value : true
            },
            {
                label : 'Illness',
                value : true
            },
            {
                label : 'Emergency Care',
                value : true
            },
            {
                label : 'Cancer',
                value : true
            },
            {
                label : 'Surgeries & Rx Meds',
                value : true
            },
            {
                label : 'Accident & Illness Exam Fees',
                value : true
            },
            {
                label : 'Rehabilitative, Acupuncture & Chiropratic Coverage cross',
                value : true
            }
        ]
    };

    handleClick(event) {
        var name = event.target.name;
        this.isDog = false;
        this.isCat = false;
        this.dogClassBtn = this.CLASS_BUTTON_INACTIVE;
        this.catClassBtn = this.CLASS_BUTTON_INACTIVE;

        if(name === 'Dog') {
            this.isDog = true;
            this.dogClassBtn = this.CLASS_BUTTON_ACTIVE;
        }
        else if(name === 'Cat') {
            this.isCat = true;
            this.catClassBtn = this.CLASS_BUTTON_ACTIVE;
        }
    }
    invokeQuotepage(){
        console.log('Inside invokeQuotepage');
        this[NavigationMixin.Navigate]({
          type: 'standard__namedPage',
          attributes: {
              name: 'petInsQuote__c',
             
  
          },
          state: {
          }
      });
      }
}