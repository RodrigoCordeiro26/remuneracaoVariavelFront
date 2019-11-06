import { Component, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'rv-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.css']
})
export class AlertModelComponent  {

  modalRef : BsModalRef;
  @Input() type = 'sucess'
  @Input() menssage:string;
  

  constructor( public bsModelRef:BsModalRef) {}

  onClose(){
    this.bsModelRef.hide();
  }
}
