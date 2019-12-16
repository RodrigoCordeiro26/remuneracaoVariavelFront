import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';

import { FormsModule }   from '@angular/forms'
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { RegraCompostaComponent } from './regra-composta/regra-composta.component';
import { RegraComponent } from './regra/regra.component';
import { ExcelService } from 'src/services/domain/excel.service';
import { RegraService } from 'src/services/domain/regra.service';
import { IndicadorService } from 'src/services/domain/indicador.service';
import { TipoRemuneracaoService } from 'src/services/domain/tipoRemuneracao.service';
import { CadastroRegraComponent } from './cadastro-regra/cadastro-regra.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PeriodoService } from 'src/services/domain/periodo.service';
import { ConsultaRegraComponent } from './consulta-regra/consulta-regra.component';

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
    RegraCompostaComponent,
    RegraComponent,
    CadastroRegraComponent,
    ConsultaRegraComponent,
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
    AutocompleteLibModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }, 
    CadastroSegmentoService,
    ExcelService,
    RegraService,
    IndicadorService,
    TipoRemuneracaoService,
    PeriodoService
  
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
