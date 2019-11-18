import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LegivelService } from "src/services/domain/Legiveis.service";
import {legiveisDTO} from 'src/models/Legiveis.dto'
import { error } from 'util';
import { DatePipe } from '@angular/common' ;






@Component({
  selector: 'rv-legibilidade-rv',
  templateUrl: './legibilidade-rv.component.html',
  styleUrls: ['./legibilidade-rv.component.css']
})
export class LegibilidadeRvComponent {

  legibilidadeList: legiveisDTO[];
  receberRVEscolhido: boolean;
  tipoTeto: number;
  dados:legiveisDTO;


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
      success =>{
        this.getLegibilidade();
        console.log("sucesso")
      } ,
      error => console.log("error")
      
      
      
    )
    this.legibilidadeList;
  }

  getLegibilidade() {
   this.service.getComposicao().subscribe(dadosRH => {

    for(let dado in dadosRH){
     var fim = dadosRH[dado].dtaVigenciaFinal;
     var inicio = dadosRH[dado].dtaVigenciaInicial;
     if( inicio !==null){
      var currentTime = new Date( inicio);
      var month = currentTime.getMonth() + 1
      var a = month < 10 ? "0" + month : month
      var day = currentTime.getDate() <= 9 ? "0" + currentTime.getDate() : currentTime.getDate()
      var year = currentTime.getFullYear()  
      dadosRH[dado].dtaVigenciaInicial = year +"-" + a + "-" + day;

     }
     if(fim !== null){
      var currentTime = new Date( fim);
      var month = currentTime.getMonth() + 1 
      var a = month < 10 ? "0" + month : month
      var day = currentTime.getDate() <= 9 ? "0" + currentTime.getDate() : currentTime.getDate()
      var year = currentTime.getFullYear()  
      dadosRH[dado].dtaVigenciaFinal = year +"-" + a + "-" + day;
     }
    }
     this.legibilidadeList = dadosRH;
   })
  }


  // variavel para paginação da composição 
  public paginaAtual = 1;

}
