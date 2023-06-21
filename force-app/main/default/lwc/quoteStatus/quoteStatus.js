import { LightningElement,api } from 'lwc';

export default class QuoteStatus extends LightningElement {
        @api stages;
    @api currentStage;
    
}