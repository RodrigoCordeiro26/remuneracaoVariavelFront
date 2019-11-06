import { Component, TemplateRef, ViewChild} from '@angular/core';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import {Indicadores} from 'src/models/Indicadores.dto';
import { CadastroComposicaoRegraService } from "src/services/domain/CadastroComposicaoRegra.service";
import {CadastroComposicaoRegraDTO} from 'src/models/CadastroComposicaoRegra.dto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AlertModelComponent} from 'src/app/alert-model/alert-model.component';




@Component({
  selector: 'rv-cadastro-composicao-regra',
  templateUrl: './cadastro-composicao-regra.component.html',
  styleUrls: ['./cadastro-composicao-regra.component.css']
})


export class CadastroComposicaoRegraComponent {

  @ViewChild('deleteModel',{static:false}) deleteModel;
  
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
  tipoOperacao : boolean;
  dadosComposicao : CadastroComposicaoRegraDTO;
  composicaoSelecionado : number;
  bsModalRef: BsModalRef;
  deleteModelRef:BsModalRef;
  
  

 

  constructor(private service: CadastroComposicaoRegraService,
              private modalService: BsModalService)
    {
     this.getMyList()
  }

  getMostravalor(){
     this.flgValor = true;
  }

  getCadastraComposicaoRegra(){
    let dadosComposicao : CadastroComposicaoRegraDTO = {
      codEmpresa : this.empresa,
      codProduto: this.produto,
      codModalidade: this.modalidade,
      codRamo: this.ramo,
      codGrupo : this.grupo,
      codSubgrupo: this.subgrupo,
      tipoOperacao : this.tipoOperacao
    }
    
     this.service.insert(dadosComposicao).subscribe(
       success =>{
        this.service.getComposicao().subscribe(composicoes =>{
        this.composicaoList = composicoes;
        
      })
      this.AlertSucesso();
    },
       error => this.AlertError(),
       () => console.log('completo')
     );
     
       
     
  }

  deletarComposicaoRegra(composicao : number){
    this.composicaoSelecionado = composicao;
    this.deleteModelRef = this.modalService.show(this.deleteModel, {class: 'modal-sm'});
  }
   
     confirmaDelete(){
      this.service.delete(this.composicaoSelecionado).subscribe(
        success =>{
          this.service.getComposicao().subscribe(composicoes =>{
          this.composicaoList = composicoes;
        })
          this.deleteModelRef.hide();
      },
         error => console.log('error'),
         () => console.log('completo')
       );

     }
      
     negarDelete(){
       this.deleteModelRef.hide();
     } 
  

  public paginaAtual = 1;

  getMyList(){
    this.service.getEmpresa().subscribe(list => {
      this.empresaList = list;
      
    }),
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

  getBuscarProduto(){
    this.service.getProduto(this.empresa).subscribe(produto =>{
      this.produtoList = produto;
    })
  }

  getBuscarRamo(){
    this.service.getRamo(this.produto).subscribe(ramo =>{
      this.ramoList = ramo;
    })
  }

  getBuscarModalidade(codRamo:number){
    this.service.getModalidade(this.ramo).subscribe(modalidade =>{
      this.modalidadeList = modalidade;
    })
  }

  
  
  
  


confirm(): void {
  this.deleteModelRef.hide();
}

decline(): void {
  this.deleteModelRef.hide();
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
//Alerta de Error
AlertError(){
  this.bsModalRef = this.modalService.show(AlertModelComponent);
  this.bsModalRef.content.type = 'danger';
  this.bsModalRef.content.message = 'Error ao salvar composicao';
}
//Alerta de sucesso
AlertSucesso(){
  this.bsModalRef = this.modalService.show(AlertModelComponent);
  this.bsModalRef.content.type = 'success';
  this.bsModalRef.content.message = 'Composicao incluida com sucesso';
}
}


