import { Component} from '@angular/core';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import {Indicadores} from 'src/models/Indicadores.dto';
import { CadastroComposicaoRegraService } from "src/services/domain/CadastroComposicaoRegra.service";
import {CadastroComposicaoRegraDTO} from 'src/models/CadastroComposicaoRegra.dto';




@Component({
  selector: 'rv-cadastro-composicao-regra',
  templateUrl: './cadastro-composicao-regra.component.html',
  styleUrls: ['./cadastro-composicao-regra.component.css']
})


export class CadastroComposicaoRegraComponent {
  
  myList: Indicadores[];
  confirmeList: Indicadores[] = [];
  regra : Indicadores[] = [];
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
  empresa : number;
  produto : number;
  ramo : number;
  modalidade: number;
  grupo : number;
  subgrupo: number;
  composicaoList : CadastroComposicaoRegraDTO[];

  dadosComposicao : CadastroComposicaoRegraDTO;
  
  

  

 

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

  getCadastraComposicaoRegra(){
    this.dadosComposicao = {
      codEmpresa : this.empresa,
      codProduto: this.produto,
      codModalidade: this.modalidade,
      codRamo: this.ramo,
      codGrupo : this.grupo,
      codSubgrupo: this.subgrupo
    }
    
     this.service.insert(this.dadosComposicao).subscribe(
       success =>console.log('sucesso'),
       error => console.log('error'),
       () => console.log('completo')
     );
     
       
     
  }

  public paginaAtual = 1;

  getMyList(){
    this.service.getEmpresa().subscribe(list => {
      this.empresaList = list;
      
    }),
    this.service.getProduto().subscribe(produto =>{
      this.produtoList = produto;
    })
    this.service.getRamo().subscribe(ramo =>{
      this.ramoList = ramo;
    })
    this.service.getModalidade().subscribe(modalidade =>{
      this.modalidadeList = modalidade;
    })
    this.service.getGrupo().subscribe(grupo =>{
      this.grupoList = grupo;
    })
    this.service.getSubgrupo().subscribe(subgrupo =>{
      this.subgrupoList = subgrupo;
    })
    this.service.getIndicadores().subscribe(indicador =>{
      this.myList = indicador;
    })
    this.service.getComposicao().subscribe(composicoes =>{
      this.composicaoList = composicoes;
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


