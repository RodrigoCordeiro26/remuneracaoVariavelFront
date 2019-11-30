import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CadastroRegioesService } from 'src/services/domain/CadastroRegioe.service';
import { Regioes } from 'src/models/Regioes.dto';
import { Regiao } from 'src/models/Regiao.dto';
import { RegiaoTetoFaixa } from 'src/models/RegiaoTetoFaixa.dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Cargo } from 'src/models/cargo.dto';
import { DiretoriaDTO } from 'src/models/diretoria.dto'
import { SucursalDTO } from 'src/models/sucursal.dto'
import { ReginalDTO } from 'src/models/regional.dto'
import { AlertModelComponent } from 'src/app/alert-model/alert-model.component';


export interface Cargos {
  cdCargo: number
  nmCargo: string
}

export interface RegionalSelecionada{
  cdRegiao:number
  cdRegional:number
  nmRegional:string
}

export interface RegioesDTO {
  nmeRegiao: string
  cdCargo: number
  teto: number
  faixaDe: number
  faixaAte: number
}

@Component({
  selector: 'rv-cadastro-regiao-rv',
  templateUrl: './cadastro-regiao-rv.component.html',
  styleUrls: ['./cadastro-regiao-rv.component.css']
})
export class CadastroRegiaoRvComponent {

  @ViewChild('cadastroRegiao', { static: false }) cadastroRegiao

  myList: []
  confirmeList: [] = []
  regra: [] = []
  cadastroRegiaoRef: BsModalRef

  nomeRegiao: string
  codCargo: number
  teto: number
  faixaDe: number
  faixaAte: number
  regioesList: Regioes[] = []
  nmeCargo: string
  cargos: Cargos[]
  diretoria: any[]
  sucursal: any[]
  regional: any[]
  listaRegioesCadastrada: Regiao[]
  regiaoSelecionada: number
  detalhesRegiao: Regiao[] = []
  detalheTetoFaixa: RegiaoTetoFaixa[] = []
  diretorias: DiretoriaDTO[] = []
  sucursais:SucursalDTO[] = []
  reginais:ReginalDTO[] = []
  detalheNmRegiao:string
  mostraDetalhe:boolean = false
  bsModalRef: BsModalRef

  dropdownListDiretoria = []
  dropdownListSucursal = []
  dropdownListRegional:RegionalSelecionada[] = []
  selectedItemsDiretor = []
  selectedItemsSurcursal = []
  selectedItemsRegional:RegionalSelecionada[] = []
  dropdownSettingsDiretoria: IDropdownSettings
  dropdownSettingsSucursal: IDropdownSettings
  dropdownSettingsRegional: IDropdownSettings

  constructor(private http: HttpClient,
    private bsModalService: BsModalService,
    private service: CadastroRegioesService
  ) {
    this.getBuscarCargo();
    this.getBuscarDiretoria();
    this.getBuscarRegioes()


  }

  getBuscarDiretoria() {
    this.service.getDiretoria().subscribe(diretor => {
      this.dropdownListDiretoria = diretor;
    })

    this.dropdownSettingsDiretoria = {
      singleSelection: false,
      idField: 'cdDiretoria',
      textField: 'nmDiretoria',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

  getMostraDetalhes() {

    console.log(this.regiaoSelecionada)
    this.detalhesRegiao = []
    this.detalheTetoFaixa = []
    this.diretorias =[]
    this.sucursais =[]
    this.reginais =[]

    this.listaRegioesCadastrada.forEach(regiao => {
      if (this.regiaoSelecionada == regiao.cdRegiao) {
        this.detalhesRegiao.push(regiao)

      }
    })
    this.detalhesRegiao.forEach(detalhe => {
      detalhe.regiaoTetoFaixaDomain.forEach(tetoFaixa => {

        let cargo: Cargo = {
          cdCargo: tetoFaixa.cargoDomain.cdCargo,
          nmCargo: tetoFaixa.cargoDomain.nmCargo
        }


        let teto: RegiaoTetoFaixa = {
          cdCargo: tetoFaixa.cdCargo,
          faixaDe: tetoFaixa.faixaDe,
          faixaAte: tetoFaixa.faixaAte,
          teto: tetoFaixa.teto,
          cargoDomain: cargo

        }
        this.detalheTetoFaixa.push(teto)
      })

      

      detalhe.diretoria.forEach(dir => {
        this.diretorias.push(dir)
      })

      detalhe.sucursal.forEach(suc=>{
        this.sucursais.push(suc)
      })

      detalhe.regional.forEach(reg=>{
        this.reginais.push(reg)
      })
      this.detalheNmRegiao = detalhe.nmRegiao
    })

    
    this.mostraDetalhe = true

  }

  getBuscarSucursal(item: any) {
    if (this.selectedItemsDiretor.length == 0) {
      item.forEach(i => {
        this.selectedItemsDiretor.push(i)
      })
    }


    this.service.getSucursal(this.selectedItemsDiretor).subscribe(sucusal => {
      this.dropdownListSucursal = sucusal;
    })

    this.dropdownSettingsSucursal = {
      singleSelection: false,
      idField: 'cdSucursal',
      textField: 'nmSucursal',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  getBuscarRegional(item: any) {

    if (this.selectedItemsSurcursal.length == 0) {

      item.forEach(i => {
        this.selectedItemsSurcursal.push(i)
      })
    }
    this.service.getRegional(this.selectedItemsSurcursal).subscribe(regional => {
      this.dropdownListRegional = regional;
    })

    this.dropdownSettingsRegional = {
      singleSelection: false,
      idField: 'cdReginal',
      textField: 'nmRegional',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  getBuscarCargo() {
    this.service.getCargo().subscribe(cargo => {
      this.cargos = cargo;
    })


  }

  getLimpaRegiao(){
    this.regioesList = []
    this.nomeRegiao = ""
    this.diretoria = []
    this.sucursal = []
    this.regional = []
    this.selectedItemsDiretor = []
    this.selectedItemsSurcursal = []
    this.selectedItemsRegional =[] 
    this.dropdownListSucursal = []
    this.dropdownListRegional = []
  }

  getValidarRegional(item:any){
    this.selectedItemsRegional.forEach(reginalSelecionada=>{
     this.dropdownListRegional.forEach(l=>{
       if(l.cdRegional == reginalSelecionada.cdRegional && l.cdRegiao != null){
           this.Alert('Regional já esta cadastrada em uma região','danger')
           this.selectedItemsRegional.pop()
           return true;
       }
     })
    })

  }

  gravar() {
    let tetoFaixas: RegiaoTetoFaixa[] = []


    this.regioesList.forEach(reg => {
      let tetoFaixa: RegiaoTetoFaixa = {
        cdCargo: reg.cargo,
        teto: reg.teto,
        faixaDe: reg.faixaDe,
        faixaAte: reg.faixaAte,
        cargoDomain: null
      }
      tetoFaixas.push(tetoFaixa)
    })

    if (this.selectedItemsRegional.length > 0) {
      this.regional = this.selectedItemsRegional
    } else if (this.selectedItemsSurcursal.length > 0) {
      this.sucursal = this.selectedItemsSurcursal
    } else {
      this.diretoria = this.selectedItemsDiretor
    }


    let dadosRgiao: Regiao = {
      cdRegiao: null,
      nmRegiao: this.nomeRegiao,
      regiaoTetoFaixaDomain: tetoFaixas,
      diretoria: this.diretoria,
      sucursal: this.sucursal,
      regional: this.regional

    }

    this.service.insert(dadosRgiao).subscribe(
      success =>{
        this.getBuscarRegioes(),
        this.getLimpaRegiao(),
        this.Alert('Região cadastrada com sucesso','success')
        console.log('sucesso')
      } ,
      error => console.log('error')
    )

  }

  getRegioes() {

    this.cargos.forEach(ca => {

      if (this.codCargo == ca.cdCargo) {
        this.nmeCargo = ca.nmCargo
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
    this.codCargo = null;
    this.teto = null;
    this.faixaDe = null;
    this.faixaAte = null;
  }


  getBuscarRegioes() {
    this.service.getRegioes().subscribe(regiao => {
      this.listaRegioesCadastrada = regiao;
    })
  }

 //Alerta 
 Alert(mensagem: string, tipoAlerta: string) {
  this.bsModalRef = this.bsModalService.show(AlertModelComponent);
  this.bsModalRef.content.type = tipoAlerta;
  this.bsModalRef.content.message = mensagem;
}

}
