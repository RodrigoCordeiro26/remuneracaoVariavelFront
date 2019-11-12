import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {CadastroRegioesService  } from 'src/services/domain/CadastroRegioe.service';


export interface Indicadores {
  nome: String;
  cod: number;
}
@Component({
  selector: 'rv-cadastro-regiao-rv',
  templateUrl: './cadastro-regiao-rv.component.html',
  styleUrls: ['./cadastro-regiao-rv.component.css']
})
export class CadastroRegiaoRvComponent implements OnInit {

  @ViewChild('cadastroRegiao', { static: false }) cadastroRegiao;

  myList: Indicadores[];
  confirmeList: Indicadores[] = [];
  regra: Indicadores[] = [];
  cadastroRegiaoRef: BsModalRef;

  nomeRegião: string;
  codCargo: number;
  teto: number;
  faixa: number;

  cargos:[];

  constructor(private http: HttpClient,
    private bsModalService: BsModalService,
    private service:CadastroRegioesService) {
    this.getSucursal();
  }

  getSucursal() {
    this.http.get<Indicadores[]>('assets/sucursal.json').subscribe(list => {
      this.myList = list;
    })

    this.service.getCargo().subscribe(cargo =>{
    this.cargos = cargo;
    })


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
