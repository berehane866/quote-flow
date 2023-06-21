import { LightningElement,api } from 'lwc';

export default class CapPetInsOptions extends LightningElement {

    @api petType;
    dogbtnHandleClick(event){
        console.log('Inside dogbtnHandleClick');
        this.petType ='Dog';
        console.log('1.. this.petType =='+this.petType );
    }
    catbtnHandleClick(event){
        console.log('Inside catbtnHandleClick');
        this.petType ='Cat';
        console.log('2.. this.petType =='+this.petType );
    }
}