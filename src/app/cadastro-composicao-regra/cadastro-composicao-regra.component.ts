import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Indicadores } from 'src/models/Indicadores.dto';
import { CadastroComposicaoRegraService } from "src/services/domain/CadastroComposicaoRegra.service";
import { CadastroComposicaoRegraDTO } from 'src/models/CadastroComposicaoRegra.dto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModelComponent } from 'src/app/alert-model/alert-model.component';




@Component({
  selector: 'rv-cadastro-composicao-regra',
  templateUrl: './cadastro-composicao-regra.component.html',
  styleUrls: ['./cadastro-composicao-regra.component.css']
})


export class CadastroComposicaoRegraComponent {

  @ViewChild('deleteModel', { static: false }) deleteModel;

  myList: Indicadores[];
  confirmeList: Indicadores[] = [];
  regra: Indicadores[] = [];
  flgRegras: boolean = false;
  flgValor: boolean = false;
  flgPorcentagem: boolean = false;
  tipoDado: number;
  produtoList: [];
  empresaList: [];
  ramoList: [];
  modalidadeList: [];
  grupoList: [];
  subgrupoList: [];
  empresa: number;
  produto: number;
  ramo: number;
  modalidade: number;
  grupo: number;
  subgrupo: number;
  composicaoList: CadastroComposicaoRegraDTO[];
  tipoOperacao: boolean;
  dadosComposicao: CadastroComposicaoRegraDTO;
  composicaoSelecionado: number;
  bsModalRef: BsModalRef;
  deleteModelRef: BsModalRef;
  operador: string = "";





  constructor(private service: CadastroComposicaoRegraService,
    private modalService: BsModalService) {
    this.getMyList()
  }
  //cadastra os composição que o usuario escolhe nos combobox.
  getCadastraComposicaoRegra() {
    let dadosComposicao: CadastroComposicaoRegraDTO = {
      codEmpresa: this.empresa,
      codProduto: this.produto,
      codModalidade: this.modalidade,
      codRamo: this.ramo,
      codGrupo: this.grupo,
      codSubgrupo: this.subgrupo,
      tipoOperacao: this.tipoOperacao
    }

    this.service.insert(dadosComposicao).subscribe(
      success => {
        this.service.getComposicao().subscribe(composicoes => {
          this.composicaoList = composicoes;

        })
        this.AlertSucesso('Composicao incluida com sucesso', 'success');
      },
      error => this.AlertError('Error ao salvar composicao, por favor tente mais tarde', 'danger'),
      () => console.log('completo')
    );



  }
  //chama o modal para confirma ou negar o delete da composição.
  deletarComposicaoRegra(composicao: number) {
    this.composicaoSelecionado = composicao;
    this.deleteModelRef = this.modalService.show(this.deleteModel, { class: 'modal-sm' });
  }

  //Confirma o delete da composição.
  confirmaDelete() {
    this.service.delete(this.composicaoSelecionado).subscribe(
      success => {
        this.service.getComposicao().subscribe(composicoes => {
          this.composicaoList = composicoes;

        })
        this.deleteModelRef.hide();
        this.AlertSucesso('exclusão efetuada com sucesso!', 'success')
      },

      error => {
        this.deleteModelRef.hide(),
          this.AlertError('Erro ao deletar composição, tente mais tarde', 'danger')
      },
      () => console.log('completo')
    );

  }
  //nega o delete e fecha o modal
  negarDelete() {
    this.deleteModelRef.hide();
  }

  // variavel para paginação da composição 
  public paginaAtual = 1;

  //Lista que carrega ao iniciar a tela.
  getMyList() {
    this.service.getEmpresa().subscribe(list => {
      this.empresaList = list;

    }),

      this.service.getIndicadores().subscribe(indicador => {
        this.myList = indicador;
      })
    this.service.getComposicao().subscribe(composicoes => {
      this.composicaoList = composicoes;
    })

  }

  //Busca grupo para popular combobox 
  getGrupo(numGrupoModalidade: number) {
    this.service.getGrupo(numGrupoModalidade).subscribe(grupo => {
      this.grupoList = grupo;
    })
  }


  //Buscar subgrupo para popular o combobox
  getSubgrupo() {
    this.service.getSubgrupo(this.grupo).subscribe(subgrupo => {
      this.subgrupoList = subgrupo;
    })
  }


  //Busca produto para popular o combobox de produto.
  getBuscarProduto() {
    this.service.getProduto(this.empresa).subscribe(produto => {
      this.produtoList = produto;
    })
  }

  //Busca Ramo para popular o combobox de ramo.
  getBuscarRamo() {
    this.service.getRamo(this.produto).subscribe(ramo => {
      this.ramoList = ramo;
    })
  }

  //Busca modalidade para popular o combobox de modalidade.
  getBuscarModalidade() {
    this.service.getModalidade(this.ramo).subscribe(modalidade => {
      this.modalidadeList = modalidade;
    })
  }

  //metodo responsavél pelo drag drop.
  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if ((this.confirmeList.length == 0 && event.container.id === "cdk-drop-list-1") ||
        (this.regra.length == 0 && event.container.id === "cdk-drop-list-2") ||
        (event.container.id === "cdk-drop-list-0")) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.getMyList()
        if (event.container.id === "cdk-drop-list-1") {
          this.flgRegras = true;
        }

      }
    }
  }
  //Alerta de Error
  AlertError(mensagem: string, tipoAlerta: string) {
    this.bsModalRef = this.modalService.show(AlertModelComponent);
    this.bsModalRef.content.type = tipoAlerta;
    this.bsModalRef.content.message = mensagem;
  }
  //Alerta de sucesso
  AlertSucesso(mensagem: string, tipoAlerta: string) {
    this.bsModalRef = this.modalService.show(AlertModelComponent);
    this.bsModalRef.content.type = tipoAlerta;
    this.bsModalRef.content.message = mensagem;
  }


}


