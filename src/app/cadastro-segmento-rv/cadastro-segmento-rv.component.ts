import { Component, OnInit, ɵConsole } from '@angular/core';
import { CadastroSegmentoRVDTO } from "src/models/CadastroSegmentoRV.dto";
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service'
import { FiltrosDTO } from 'src/models/Filtros.dto';




@Component({
  selector: 'rv-cadastro-segmento-rv',
  templateUrl: './cadastro-segmento-rv.component.html',
  styleUrls: ['./cadastro-segmento-rv.component.css']
})
export class CadastroSegmentoRVComponent implements OnInit {

  pageOfItems: Array<any>;

  objDTO: CadastroSegmentoRVDTO = {
    id: null,
    nmSegmentoRV: "",
    isSeguro: false,
    observacao: "",
    normal: false,
    assessoria: false
  }

  orderByCres: true

  objSearchDTO: FiltrosDTO = {
    opcaoSelectionada: "",
    src: "",
    codigo: 0
  }

  filter: String

  items: CadastroSegmentoRVDTO[];

  constructor(public service: CadastroSegmentoService) {

  }

  ngOnInit() {
    this.getList()

  }

  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  imprimir() {

    this.service.getListByFilter(this.objSearchDTO).subscribe(res => {
      this.items = res;
    });
  }

  gravar() {
    this.service.insert(this.objDTO).subscribe(response => {

    });
  }
  getList() {
    this.service.getAll().subscribe(response => {
      this.items = response;
      this.converterJson();

    })
  }
  atualizarLista() {

    this.getList();
  }

  converterJson() {
    this.items.map(function (obj) {
      return Object.keys(obj).map(function (chave) {
        return obj[chave];
      });
    });
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
  teste(){
    console.log(this.filter)
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
}
