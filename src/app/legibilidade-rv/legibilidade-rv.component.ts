import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LegivelService } from "src/services/domain/Legiveis.service";
import { legiveisDTO } from 'src/models/Legiveis.dto'
import { AlertModelComponent } from 'src/app/alert-model/alert-model.component';
import { style } from '@angular/animations';


@Component({
  selector: 'rv-legibilidade-rv',
  templateUrl: './legibilidade-rv.component.html',
  styleUrls: ['./legibilidade-rv.component.css']
})
export class LegibilidadeRvComponent {

  @ViewChild('InformaModel', { static: true },) InformaModel;

  legibilidadeList: legiveisDTO[];
  items: legiveisDTO[];
  receberRVEscolhido: boolean;
  tipoTeto: number;
  dados: legiveisDTO;
  filter: string;
  opcoes: String;
  numMatricula: number;
  valorPesquisa: string;
  valorPesquisaNome: string;
  valorPesquisaData: string;
  valorPesquisaTeto: number;
  valorPesquisaSimNao: string;
  bsModalRef: BsModalRef;
  deleteModelRef: BsModalRef;

  itensRemovido:number = 0;
  itensAtualizado:number = 0;


  modalRef: BsModalRef;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private service: LegivelService) {
    this.getLegibilidade();


  }

  getColor(status) {
    switch (status) {
      case 'novo':
        return 'darkgreen';
      case 'removido':
        return 'red';
      case 'existe':
        return 'black';
    }
  }

  
  getChamarModalDescricao() {
    this.service.insert(this.legibilidadeList).subscribe(
      success => {

        this.getLegibilidade();
        this.getQuantidadeItensAtualizado();
        console.log("sucesso")

      },
      error => {
        console.log("error");
        this.Alert('Erro ao realizar atualização', 'dange');
      },
      () => {
        
        this.modalRef = this.modalService.show(this.InformaModel,{ class: 'modal-sm'})
        

      })
    this.legibilidadeList;
  }

  openModal2(){
    this.modalRef.hide();
    this.Alert('Atualização realizada com sucesso', 'success')
  }

  getLegibilidade() {
    this.service.getComposicao().subscribe(dadosRH => {
      this.items = dadosRH;
      this.legibilidadeList = dadosRH;
    })
  }

  getQuantidadeItensAtualizado(){
    this.itensRemovido = 0;
    this.itensAtualizado = 0;
    this.legibilidadeList.forEach(le=>{
      if(le.status === 'novo'){
         this.itensAtualizado = this.itensAtualizado + 1;
      }else if(le.status === 'removido'){
        this.itensRemovido = this.itensRemovido +1;

      }
    })
  }

  // variavel para paginação da composição 
  public paginaAtual = 1;


  filtrar() {
    console.log(this.filter)
    this.legibilidadeList = this.items

    if (this.opcoes.toLowerCase() === 'codigo') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.numMatricula.toString().indexOf(this.valorPesquisa) > -1) {
          return d;
        }
      });
      
    } else if (this.opcoes.toLowerCase() === 'nome') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.nome.toLowerCase().indexOf(this.valorPesquisa.toLowerCase()) > -1) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'cargo') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.cargo.toLowerCase().indexOf(this.valorPesquisa.toLowerCase()) > -1) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'mingarantido') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.minGarantido !== null) {
          if (d.minGarantido.toString().indexOf(this.valorPesquisa) > -1) {
            return d;
          }
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'vigenciainicial') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.dtaVigenciaInicial === this.valorPesquisaData) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'tipoteto') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.codTipoTeto === Number.parseInt(this.valorPesquisaTeto.toString())) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'vigenciafinal') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.dtaVigenciaFinal === this.valorPesquisaData) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'receberrv') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.receberRV.toString() == this.valorPesquisaSimNao) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'afastamento') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.afastamento.toString() == this.valorPesquisaSimNao) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'tipoafastamento') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.tipoAfastamento.toLowerCase().indexOf(this.valorPesquisa.toLowerCase()) > -1) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'excecao') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.excecao.toString() === this.valorPesquisaSimNao) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'nivelhie') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.nome.toLowerCase().indexOf(this.valorPesquisa.toLowerCase()) > -1) {
          return d;
        }
      })
      
    } else if (this.opcoes.toLowerCase() === 'codhie') {
      this.legibilidadeList = this.legibilidadeList.filter(d => {
        if (d.nome.toLowerCase().indexOf(this.valorPesquisa.toLowerCase()) > -1) {
          return d;
        }
      })
      
    } else {
      this.legibilidadeList = this.items;
    }

  }

  //Alerta
  Alert(mensagem: string, tipoAlerta: string) {
    this.bsModalRef = this.modalService.show(AlertModelComponent);
    this.bsModalRef.content.type = tipoAlerta;
    this.bsModalRef.content.message = mensagem;
  }




}
