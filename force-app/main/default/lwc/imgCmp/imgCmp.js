import { LightningElement, api } from "lwc";
import images from "@salesforce/resourceUrl/petFlowImgs";

export default class ImgCmp extends LightningElement {
  @api imgName; ///flowImages/servlet.png
  @api altMessage;
  imgUrl = "";
  connectedCallback() {
    this.imgUrl = images + "/flowImages/" + this.imgName;
  }
}
