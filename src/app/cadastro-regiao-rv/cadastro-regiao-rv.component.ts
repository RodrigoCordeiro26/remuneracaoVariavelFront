import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CadastroRegioesService } from 'src/services/domain/CadastroRegioe.service';
import { Regioes } from 'src/models/Regioes.dto'


export interface Cargos {
  codCargo: number
  nmeCargo: string
}

@Component({
  selector: 'rv-cadastro-regiao-rv',
  templateUrl: './cadastro-regiao-rv.component.html',
  styleUrls: ['./cadastro-regiao-rv.component.css']
})
export class CadastroRegiaoRvComponent implements OnInit {

  @ViewChild('cadastroRegiao', { static: false }) cadastroRegiao;

  myList: [];
  confirmeList: [] = [];
  regra: [] = [];
  cadastroRegiaoRef: BsModalRef;

  nomeRegiao: string;
  codCargo: number;
  teto: number;
  faixaDe: number;
  faixaAte: number;
  regioesList: Regioes[] = [];
  nmeCargo: string;
  cargos: Cargos[];

  constructor(private http: HttpClient,
    private bsModalService: BsModalService,
    private service: CadastroRegioesService) {
    this.getSucursal();
  }

  getSucursal() {
    this.http.get<[]>('assets/sucursal.json').subscribe(list => {
      this.myList = list;
    })

    this.service.getCargo().subscribe(cargo => {
      this.cargos = cargo;
    })


  }

  getRegioes() {

    this.cargos.forEach(ca => {

      if (this.codCargo == ca.codCargo) {
        this.nmeCargo = ca.nmeCargo
      }
    })
    let regioes: Regioes = {
      nomeRegiao: this.nomeRegiao,
      cargo: this.codCargo,
      teto: this.teto,
      faixaDe: this.faixaDe,
      faixaAte: this.faixaAte,
      nomeCargo: this.nmeCargo

    }

    this.regioesList.push(regioes);
    console.log(this.regioesList);
    this.codCargo = null;
    this.teto = null;
    this.faixaDe = null;
    this.faixaAte = null;
  }


  getModalCadastra() {
    this.cadastroRegiaoRef = this.bsModalService.show(this.cadastroRegiao)
  }

  ngOnInit() {
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
        this.getSucursal();

      }
    }
  }

}
