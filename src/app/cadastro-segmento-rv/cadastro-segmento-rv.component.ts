import { Component, OnInit } from '@angular/core';
import { CadastroSegmentoRVDTO } from "src/models/CadastroSegmentoRV.dto";
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service'


@Component({
  selector: 'rv-cadastro-segmento-rv',
  templateUrl: './cadastro-segmento-rv.component.html',
  styleUrls: ['./cadastro-segmento-rv.component.css']
})
export class CadastroSegmentoRVComponent implements OnInit {

  objDTO: CadastroSegmentoRVDTO = {
    id: null,
    nmSegmentoRV: "",
    isSeguro: false,
    observacao: "",
    normal: false,
    assessoria: false
  }

  items: CadastroSegmentoRVDTO[];

  constructor(public service: CadastroSegmentoService) {

  }

  ngOnInit() {
    this.getList()

  }

  gravar() {
    this.service.insert(this.objDTO).subscribe(response => {
      console.log(response);
    });
  }
  getList() {
    this.service.getAll().subscribe(response => {
      this.items = response;
      console.log(this.items)

    })
  }
  atualizarLista(event) {

    this.getList();

  }


}
