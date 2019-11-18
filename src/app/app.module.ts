import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';

import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CadastroComposicaoRegraComponent } from './cadastro-composicao-regra/cadastro-composicao-regra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import {NgxPaginationModule} from "ngx-pagination"; 
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { CadastroComposicaoRegraService } from 'src/services/domain/CadastroComposicaoRegra.service';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import {AlertModelComponent} from 'src/app/alert-model/alert-model.component';
import { LegibilidadeRvComponent } from './legibilidade-rv/legibilidade-rv.component';
import { NgxMaskModule } from 'ngx-mask';
import { CadastroRegiaoRvComponent } from './cadastro-regiao-rv/cadastro-regiao-rv.component';
import { CadastroRegioesService } from 'src/services/domain/CadastroRegioe.service';
import { LegivelService } from "src/services/domain/Legiveis.service";
=======
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';

>>>>>>> master

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ModalComponent,
    CadastroSegmentoRVComponent,
    CadastroComposicaoRegraComponent,
<<<<<<< HEAD
    AlertModelComponent,
    LegibilidadeRvComponent,
    CadastroRegiaoRvComponent
    
=======
>>>>>>> master
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    CommonModule,
    CurrencyMaskModule,
    NgxPaginationModule,
    FormsModule,
<<<<<<< HEAD
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxMaskModule.forRoot()
    
  
    
=======
    AutocompleteLibModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
>>>>>>> master
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }, 
    CadastroSegmentoService,
    CadastroComposicaoRegraService,
    CadastroRegioesService,
    LegivelService
  
  ],
  exports:[AlertModelComponent],
  entryComponents:[AlertModelComponent, CadastroComposicaoRegraComponent,LegibilidadeRvComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
