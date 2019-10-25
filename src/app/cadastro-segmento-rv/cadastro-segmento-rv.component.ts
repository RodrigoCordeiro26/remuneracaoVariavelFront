import { Component, OnInit } from '@angular/core';
import { CadastroSegmentoDTO } from 'src/models/cadastroSegmento.dto';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'rv-cadastro-segmento-rv',
  templateUrl: './cadastro-segmento-rv.component.html',
  styleUrls: ['./cadastro-segmento-rv.component.css']
})
export class CadastroSegmentoRVComponent implements OnInit {

  objDTO : CadastroSegmentoDTO ={
    nomeSegmentoRV:"",
    isSeguro: false,
    observacao: ""
  }

  constructor() { }

  ngOnInit() {
  }
 
gravar(){
  console.log(this.objDTO)
}
 

}
