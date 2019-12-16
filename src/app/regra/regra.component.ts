import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegraDTO } from 'src/models/Regra.dto';

@Component({
  selector: 'rv-regra',
  templateUrl: './regra.component.html',
  styleUrls: ['./regra.component.css']
})
export class RegraComponent implements OnInit {

  opcao:String
  filter:number
  @Input() Ilinha: RegraDTO []
  isValidForm: Boolean
  @Input() flgPeso: Boolean
  
  /**Envia para o componente pai o status de validação da linha preenchida */
  @Output() formValid = new EventEmitter();

  @Output() deleteItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.isValidForm = true;
  }

  imprimirOpcao(){
    console.log(this.opcao)
  }

  imprimir(){
    console.log(this.Ilinha)
  }


  setValidForm(valid: Boolean){
    
    this.isValidForm = valid
    this.formValid.emit(this.isValidForm)

  }

  deleteItemInList(item : RegraDTO){
   this.deleteItem.emit(item) 
  }
}
