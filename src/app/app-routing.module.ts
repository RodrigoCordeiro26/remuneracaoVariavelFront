import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';

import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';
import { CadastroComposicaoRegraComponent } from './cadastro-composicao-regra/cadastro-composicao-regra.component';
import { RegraCompostaComponent } from './regra-composta/regra-composta.component';
import { CadastroRegraComponent } from './cadastro-regra/cadastro-regra.component';

const routes: Routes = [
  {path:'',component: CadastroComposicaoRegraComponent},
  {path: 'modal', component:ModalComponent},
  {path: 'cadastro-segmento', component:CadastroSegmentoRVComponent},
  {path: 'regras', component:RegraCompostaComponent},
  {path: 'cadastro-regra', component:CadastroRegraComponent}
//  {path: 'cadastro-composicao-regra/:id',component:CadastroComposicaoRegraComponent}
//  {path: 'cadastro-composicao-regra',component:CadastroComposicaoRegraComponent}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
