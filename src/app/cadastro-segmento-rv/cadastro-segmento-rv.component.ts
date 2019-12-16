import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { CadastroSegmentoRVDTO } from "src/models/CadastroSegmentoRV.dto";
import {ExcelExportModel} from "src/models/ExcelExportModel";
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service'
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
// import * as XLSX from 'xlsx';
// import {ExcelService} from "../excel.service"
import {ExcelService} from '../../services/domain/excel.service';
@Component({
  selector: 'rv-cadastro-segmento-rv',
  templateUrl: './cadastro-segmento-rv.component.html',
  styleUrls: ['./cadastro-segmento-rv.component.scss']
})
export class CadastroSegmentoRVComponent implements OnInit {
  escondeCampo: Boolean
  date : any
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  ExportTOExcel() {
    this.mapperExcelModel();
    this.date =  new Date().toLocaleString("pt-BR");
    this.excelService.exportAsExcelFile(this.lsExcelModel, 'Segmentos RV ' + this.date);
    // this.excel.generateExcel("Segmento de Produtos", this.items, "Segmentos RV")
    // console.log(this.TABLE.nativeElement)
    // this.escondeCampo = true;
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'segmentos.xlsx');
    // this.escondeCampo = false;
  }
  mapperExcelModel(){
      this.lsExcelModel = []
      this.lista.forEach(x => {
        console.log(x.observacaoMudancaStatus)
      let model : ExcelExportModel = {
        Código: null,
        Segmento: "",
        Tipo_Produto: "",
        Observacao: "",
        Assessoria: "",
        Gratificacao: "",
        Campanha:"",
        Equipe_Comercial: "",
        Status: "",
        Observacao_Mudança_Status: "",
        Data_Atualização: ""
      }
     model.Assessoria = x.assessoria
     model.Campanha = x.campanha
     model.Código = x.id
     model.Equipe_Comercial = x.equipeComercial
     model.Gratificacao = x.gratificacao
     model.Observacao = x.observacao
     model.Observacao_Mudança_Status = x.observacaoMudancaStatus
     model.Segmento = x.nmSegmentoRV
     model.Status = x.status
     model.Tipo_Produto = x.tipoProduto
     model.Data_Atualização = x.dataAtualizacao
       this.lsExcelModel.push(model);
    });
    console.log(this.lsExcelModel)
  }
  pageOfItems: Array<any>;
  observacaoObrigatoria: Boolean;
  objDTO: CadastroSegmentoRVDTO = {
    id: null,
    nmSegmentoRV: "",
    tipoProduto: "",
    status: false,
    equipeComercial: false,
    assessoria: false,
    gratificacao: false,
    campanha: false,
    observacao: "",
    observacaoMudancaStatus: "",
    dataAtualizacao:""
  }


  lsExcelModel: ExcelExportModel [] = []
  updateObjDTO: CadastroSegmentoRVDTO = {
    id: null,
    nmSegmentoRV: "",
    tipoProduto: "",
    status: false,
    equipeComercial: false,
    assessoria: false,
    gratificacao: false,
    campanha: false,
    observacao: "",
    observacaoMudancaStatus: "",
    dataAtualizacao: ""
  }
  filter: String
  codigo: Number
  items: CadastroSegmentoRVDTO[];
  lista: CadastroSegmentoRVDTO[];
  opcoes: String

  newModal: Boolean
  modalRef: BsModalRef;
  constructor(public service: CadastroSegmentoService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private location: Location,
    private excelService:ExcelService
   ) {

  }

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo',
    screenReaderPaginationLabel: 'Página',
    screenReaderPageLabel: 'página',
    screenReaderCurrentLabel: `você está nessa página:`
  };

  ngOnInit() {
    this.getList()
    this.observacaoObrigatoria = false
    this.escondeCampo = false

  }
  openModal(template: TemplateRef<any>, item: CadastroSegmentoRVDTO) {
    this.newModal = false
    this.objDTO = item;
    this.mapper(this.objDTO);
    this.modalRef = this.modalService.show(template);
  }

  openNewModal(template: TemplateRef<any>) {
    this.newModal = true;
    this.modalRef = this.modalService.show(template);
    this.updateObjDTO.status = 'Ativo'
    this.updateObjDTO.assessoria = ""
    this.updateObjDTO.campanha = ""
    this.updateObjDTO.equipeComercial = ""
    this.updateObjDTO.gratificacao = ""
    this.updateObjDTO.id = null,
    this.updateObjDTO.nmSegmentoRV = "",
    this.updateObjDTO.observacaoMudancaStatus = ""
    this.updateObjDTO.observacao = ""
    this.updateObjDTO.tipoProduto = ""

  }

  mapper(item: CadastroSegmentoRVDTO) {
    console.log(item)
    if (item != undefined) {
      this.updateObjDTO.id = item.id
      this.updateObjDTO.assessoria = item.assessoria === "SIM" ? true : false
      this.updateObjDTO.campanha = item.campanha === "SIM" ? true : false
      this.updateObjDTO.gratificacao = item.gratificacao === "SIM" ? true : false
      this.updateObjDTO.equipeComercial = item.equipeComercial === "SIM" ? true : false
      this.updateObjDTO.nmSegmentoRV = item.nmSegmentoRV
      this.updateObjDTO.tipoProduto = item.tipoProduto === "SEGURO" ? 'Seguro' : 'Nao Seguro'
      this.updateObjDTO.status = item.status === "ATIVO" ? 'Ativo' : 'Inativo'
      this.updateObjDTO.observacaoMudancaStatus = item.observacaoMudancaStatus
      this.updateObjDTO.dataAtualizacao = item.dataAtualizacao
      console.log(this.updateObjDTO)
    }
  }
  handleChangeObservacao() {
    if (this.objDTO.status.toUpperCase() !== this.updateObjDTO.status.toUpperCase()) {
      this.observacaoObrigatoria = true;
    } else {
      this.observacaoObrigatoria = false;
    }
  }

  inativar(item: CadastroSegmentoRVDTO) {
    this.mapper(item);
    item.status = 'Inativo'
    this.service.update(item, 'STATUS');
  }

  atualizar() {
    this.service.update(this.updateObjDTO, 'STATUS');
    this.observacaoObrigatoria = false
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  gravar() {
    this.objDTO = this.updateObjDTO
    console.log(this.objDTO)
    this.service.insert(this.objDTO);
  }


  getList() {
    this.service.getAll().subscribe(response => {
      console.log(response)
      this.items = response;
      this.lista = this.items;
    })
  }
  atualizarLista() {
    this.getList();
  }


  ordenarCresc() {
    this.items.sort((a, b) => {
      if (a.id < b.id) { return -1; }
      if (a.id > b.id) { return 1; }
      return 0;
    })
  }
  ordernarDecres() {
    this.items.reverse();
  }

  setModalType(type: String) {
    if (type === 'add') {
      this.newModal = true
    } else {
      this.newModal = false;
    }
  }
  ordenarAlphaCresc() {
    console.log("alpha decres")
    this.items.sort((a, b) => {
      if (a.nmSegmentoRV < b.nmSegmentoRV) { return -1; }
      if (a.nmSegmentoRV > b.nmSegmentoRV) { return 1; }
      return 0;
    })

  }
  ordenarAlphaDecres() {
    console.log("alpha decres")
    this.items.sort((a, b) => {
      if (a.nmSegmentoRV < b.nmSegmentoRV) { return 1; }
      if (a.nmSegmentoRV > b.nmSegmentoRV) { return -1; }
      return 0;
    })
  }
  filtrar() {
    console.log(this.filter)
    this.lista = this.items

    if (this.opcoes.toLowerCase() === 'codigo') {
      this.lista = this.lista.filter(d => {
        if (d.id === this.codigo) {
          return d;
        }
      });
    }
    else if (this.opcoes.toLowerCase() === 'todos') {
      this.lista = this.items;

    }
    else if (this.opcoes.toLowerCase() === 'tipoproduto') {
      this.lista = this.lista.filter(d => {
        if (d.tipoProduto.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })

    } else if (this.opcoes.toLowerCase() === 'equipecomercial') {
      this.lista = this.lista.filter(d => {
        if (d.equipeComercial.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })
    } else if (this.opcoes.toLowerCase() === 'assessoria') {
      this.lista = this.lista.filter(d => {
        if (d.assessoria.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })
    } else if (this.opcoes.toLowerCase() === 'gratificacao') {
      this.lista = this.lista.filter(d => {
        if (d.gratificacao.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })
    } else if (this.opcoes.toLowerCase() === 'campanha') {
      this.lista = this.lista.filter(d => {
        if (d.campanha.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })
    } else if (this.opcoes.toLowerCase() === 'status') {
      this.lista = this.lista.filter(d => {
        if (d.status.toLowerCase() === this.filter.toLowerCase()) {
          return d;
        }
      })
    }
  }

}
