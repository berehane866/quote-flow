import { FlexCardMixin } from "vlocity_ins/flexCardMixin";
    import {interpolateWithRegex, interpolateKeyValue, loadCssFromStaticResource } from "vlocity_ins/flexCardUtility";
    
          import { LightningElement, api, track, wire } from "lwc";
          import pubsub from "vlocity_ins/pubsub";
          import { getRecord } from "lightning/uiRecordApi";
          import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
          import data from "./definition";
          
          import styleDef from "./styleDefinition";
              
          export default class cfCatInsurancePlanOptions extends FlexCardMixin(OmniscriptBaseMixin(LightningElement)){
              @api debug;
              @api recordId;
              @api objectApiName;
              @track _omniSupportKey = 'cfCatInsurancePlanOptions';
                  @api get omniSupportKey() {
                    return this._omniSupportKey;
                  }
                  set omniSupportKey(parentRecordKey) {
                    this._omniSupportKey = this._omniSupportKey  + '_' + parentRecordKey;
                  }
              @track record;
              
              
              pubsubEvent = [];
              customEvent = [];
              
              connectedCallback() {
                super.connectedCallback();
                this.setStyleDefinition(styleDef);
                data.Session = {} //reinitialize on reload
                
                this.flexiPageWidthAwareCB = this.flexiPageWidthAware.bind(this);
                  window.addEventListener('resize', this.flexiPageWidthAwareCB);
                
                this.setDefinition(data);
 this.registerEvents();
                
                
              }
              
              disconnectedCallback(){
                super.disconnectedCallback();
                    this.omniSaveState(this.records,this.omniSupportKey,true);
                    window.removeEventListener('resize', this.flexiPageWidthAwareCB);

                  this.unregisterEvents();
              }

              registerEvents() {
                
              }

              unregisterEvents(){
                
              }
            
              renderedCallback() {
                super.renderedCallback();
                
                if(!this.containerWidthInitialised) {
                  this.containerWidthInitialised = true;
                  this.flexiPageWidthAware();
                }
              }
          }