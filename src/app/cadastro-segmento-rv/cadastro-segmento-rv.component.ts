import { Component, OnInit } from '@angular/core';
import { CadastroSegmentoRVDTO } from "src/models/CadastroSegmentoRV.dto";
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  
  public items : CadastroSegmentoRVDTO [];

  constructor(public service: CadastroSegmentoService) {

  }

  ngOnInit() {
    this.service.getAll().subscribe(res=>{
      this.items = res;
      console.log(this.items)
    })
  }

  gravar() {
    this.service.insert(this.objDTO).subscribe(response => {
      console.log(response);
    });
  }
  getList() {
    this.service.getAll().subscribe(response=>{
      this.items = response;
      console.log(this.items)
    })
  }

}
