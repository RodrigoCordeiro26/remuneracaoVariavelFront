import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface legibilidade{
  matricula:number,
  nome:string,
  cargo:string,
  minGarantido:number,
  tipoTeto: string,
  vigenciaInicial:string,
  vigenciaFinal:string,
  receberRV:boolean,
  afastamento:string,
  tipoAfastamento: string,
  excecao:string,
  nivelHie: string,
  codHieraquia:number,
  observacoes:string
}

@Component({
  selector: 'rv-legibilidade-rv',
  templateUrl: './legibilidade-rv.component.html',
  styleUrls: ['./legibilidade-rv.component.css']
})
export class LegibilidadeRvComponent  {

  legibilidadeList: legibilidade[];
  receberRVEscolhido: boolean;

  constructor(private http: HttpClient){
  this.getLegibilidade();

  }

   
  getLegibilidade(){
    this.http.get<legibilidade[]>('assets/legibilidade.json').subscribe(list =>{
    this.legibilidadeList = list;
    })
}

   // variavel para paginação da composição 
   public paginaAtual = 1;

}
