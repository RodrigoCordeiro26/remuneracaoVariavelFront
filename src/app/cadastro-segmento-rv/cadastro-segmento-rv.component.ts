import { Component, OnInit, TemplateRef } from '@angular/core';
import { CadastroSegmentoRVDTO } from "src/models/CadastroSegmentoRV.dto";
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service'
import { FiltrosDTO } from 'src/models/Filtros.dto';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';



@Component({
  selector: 'rv-cadastro-segmento-rv',
  templateUrl: './cadastro-segmento-rv.component.html',
  styleUrls: ['./cadastro-segmento-rv.component.scss']
})
export class CadastroSegmentoRVComponent implements OnInit {

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
    obsAtualizacaoStatus: ""
  }
  filter2: String

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
    obsAtualizacaoStatus: null
  }

  orderByCres: true
  objSearchDTO: FiltrosDTO = {
    opcaoSelectionada: "",
    src: "",
    codigo: 0
  }
  filter: String
  codigo: Number
  items: CadastroSegmentoRVDTO[];
  lista: CadastroSegmentoRVDTO[];
  opcoes: String

  newModal: Boolean

  $scope = this.items;
  modalRef: BsModalRef;
  constructor(public service: CadastroSegmentoService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private location: Location) {

  }

  ngOnInit() {
    this.getList()
    this.observacaoObrigatoria = false

  }
  openModal(template: TemplateRef<any>, item: CadastroSegmentoRVDTO) {
    this.newModal = false
    this.objDTO = item;
    console.log(item)
    
    this.mapper(item);

    this.modalRef = this.modalService.show(template);
  }

  openNewModal(template: TemplateRef<any>){
    this.newModal = true;
    this.modalRef = this.modalService.show(template);
    this.updateObjDTO.status = 'Ativo'
    this.updateObjDTO.assessoria = ""
    this.updateObjDTO.campanha = ""
    this.updateObjDTO.equipeComercial = ""
    this.updateObjDTO.gratificacao = ""
    this.updateObjDTO.id = null,
    this.updateObjDTO.nmSegmentoRV = "",
    this.updateObjDTO.obsAtualizacaoStatus = ""
    this.updateObjDTO.observacao = ""
    this.updateObjDTO.tipoProduto = ""

  }

  mapper(item: CadastroSegmentoRVDTO){
    if (item != undefined) {
      this.updateObjDTO.id = item.id
      this.updateObjDTO.assessoria = item.assessoria === "SIM" ? true : false
      this.updateObjDTO.campanha = item.campanha === "SIM" ? true : false
      this.updateObjDTO.gratificacao = item.gratificacao === "SIM" ? true : false
      this.updateObjDTO.equipeComercial = item.equipeComercial === "SIM" ? true : false
      this.updateObjDTO.nmSegmentoRV = item.nmSegmentoRV
      this.updateObjDTO.tipoProduto = item.tipoProduto === "SEGURO" ? 'Seguro' : 'Nao Seguro'
      this.updateObjDTO.status = item.status === "ATIVO" ? 'Ativo' : 'Inativo'

    }
  }
  handleChangeObservacao(){
    if(this.objDTO.status.toUpperCase() !== this.updateObjDTO.status.toUpperCase()){
      this.observacaoObrigatoria = true;
    }else{
      this.observacaoObrigatoria = false;
    }
  }

  inativar(item : CadastroSegmentoRVDTO){
    this.mapper(item);
    item.status = 'Inativo'
    this.service.update(item, 'STATUS');
  }

  atualizar() {

    if(this.updateObjDTO.obsAtualizacaoStatus !== null || this.objDTO.status.toUpperCase() === this.updateObjDTO.status.toUpperCase()){
      this.service.update(this.updateObjDTO, 'update');

    }

      
      this.observacaoObrigatoria = false
     
    }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  gravar() {
    this.objDTO = this.updateObjDTO
    console.log(this.objDTO)
      this.service.insert(this.objDTO);
    
  }


  getList() {
    this.service.getAll().subscribe(response => {
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
    else if(this.opcoes.toLowerCase() ==='todos'){
      this.lista = this.items;
      
    }
    else if(this.opcoes.toLowerCase()==='tipoproduto'){ 
      this.lista = this.lista.filter(d => {
        if (d.tipoProduto.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
      
    }else if(this.opcoes.toLowerCase() === 'equipecomercial'){
      this.lista = this.lista.filter(d => {
        if (d.equipeComercial.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
    }else if(this.opcoes.toLowerCase() === 'assessoria'){
      this.lista = this.lista.filter(d => {
        if (d.assessoria.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
    }else if(this.opcoes.toLowerCase() ==='gratificacao'){
      this.lista = this.lista.filter(d => {
        if (d.gratificacao.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
    }else if(this.opcoes.toLowerCase() === 'campanha'){
      this.lista = this.lista.filter(d => {
        if (d.campanha.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
    }else if(this.opcoes.toLowerCase()==='status'){
      this.lista = this.lista.filter(d => {
        if (d.status.toLowerCase() === this.filter.toLowerCase()){
          return d;
        }
      })
    }
  



  }

  teclaPress(e: Event){
    console.log("entrou")
    console.log(e.target);
  }

  exportar() {
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });

    console.log(blob)
    // saveAs(blob, "Report.xls");
  }

}
