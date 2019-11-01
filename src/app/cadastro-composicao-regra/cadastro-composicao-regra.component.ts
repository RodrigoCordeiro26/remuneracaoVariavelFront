import { Component} from '@angular/core';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

export interface Indicador{
  nome: String;
  cod: Int16Array;
}

@Component({
  selector: 'rv-cadastro-composicao-regra',
  templateUrl: './cadastro-composicao-regra.component.html',
  styleUrls: ['./cadastro-composicao-regra.component.css']
})


export class CadastroComposicaoRegraComponent {
  
  myList: Indicador[];
  confirmeList: Indicador[] = [];
  regra : Indicador[] = [];
  flgRegras : boolean = false;
  flgValor : boolean = false;
  flgPorcentagem : boolean = false;
  tipoDado : number;

  

 

  constructor(private httpClient: HttpClient){
     this.getMyList()
  }

getCampoValorPorcentagem(valor:number){
   if(valor == 1){
      this.tipoDado = 1;
   }else{
      this.tipoDado = 2
   }
} 

  getMostravalor(){
     this.flgValor = true;
  }
  
  getMyList(){
    this.httpClient.get<Indicador[]>('assets/data.json').subscribe(list  =>{
      this.myList = list;
    })
  }
 

  drop(event: CdkDragDrop<string[]>) {
    
       if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          if((this.confirmeList.length == 0 && event.container.id === "cdk-drop-list-1")||
          (this.regra.length == 0 && event.container.id === "cdk-drop-list-2") ||
          (event.container.id === "cdk-drop-list-0")){
           transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.getMyList()     
      if(event.container.id === "cdk-drop-list-1"){
        this.flgRegras = true;
      }        

    }
  }
}
}


