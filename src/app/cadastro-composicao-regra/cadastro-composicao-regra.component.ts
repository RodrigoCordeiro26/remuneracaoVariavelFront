import { Component} from '@angular/core';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import {empresaDTO} from 'src/models/Empresa.dto';
import { CadastroComposicaoRegraService } from "src/services/domain/CadastroComposicaoRegra.service";


export interface Indicador{
  nome: String;
  cod: number;
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
  produtoList: [];
  empresaList: [];
  ramoList: [];
  modalidadeList:[];
  grupoList:[];
  subgrupoList:[];
  dadosComposicao: never[];
  empresa : empresaDTO[];
  produto : string;
  ramo : string;
  modalidade: string;
  grupo : string;
  subgrupo: string;
  

  

 

  constructor(private service: CadastroComposicaoRegraService){
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

  

  public paginaAtual = 1;

  getMyList(){
    this.service.getAll().subscribe(list => {
      this.empresa = list;
    })
  }
  
  // getMyList(){
  //   this.httpClient.get<Indicador[]>('assets/data.json').subscribe(list  =>{
  //     this.myList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/produto.json').subscribe(list =>{
  //     this.produtoList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/empresa.json').subscribe(list =>{
  //     this.empresaList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/ramo.json').subscribe(list =>{
  //     this.ramoList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/modalidade.json').subscribe(list =>{
  //     this.modalidadeList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/grupo.json').subscribe(list =>{
  //     this.grupoList = list;
  //   }),
  //   this.httpClient.get<[]>('assets/subgrupo.json').subscribe(list =>{
  //     this.subgrupoList = list;
  //   })
  //   this.httpClient.get<[]>('assets/dadosComposicao.json').subscribe(list =>{
  //     this.dadosComposicao   = list;
  //   })

  // }

  // getMostra(){
  //   let  teste ={
  //      "empresa" : this.empresa,
  //      "produto" : this.produto,
  //      "ramo" : this.ramo,
  //      "modalidade" : this.modalidade,
  //      "grupo" : this.grupo,
  //      "subgrupo" : this.subgrupo
  //   }
  //   this.dadosComposicao.push(teste);
  // }
 

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


