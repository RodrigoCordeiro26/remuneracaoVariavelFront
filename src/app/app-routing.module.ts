import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';

import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';
import { CadastroComposicaoRegraComponent } from './cadastro-composicao-regra/cadastro-composicao-regra.component';
import {LegibilidadeRvComponent} from './legibilidade-rv/legibilidade-rv.component';
import {CadastroRegiaoRvComponent} from './cadastro-regiao-rv/cadastro-regiao-rv.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path: 'modal', component:ModalComponent},
  {path: 'cadastro-segmento', component:CadastroSegmentoRVComponent},
  {path: 'legibilidade-rv',component : LegibilidadeRvComponent},
  {path: 'cadastro-regiao-rv', component: CadastroRegiaoRvComponent}
  {path: 'cadastro-composicao-regra/:id',component:CadastroComposicaoRegraComponent}



]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
