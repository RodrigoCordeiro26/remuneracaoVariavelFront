import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AlgumaCoisaComponent } from './alguma-coisa/alguma-coisa.component';
import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';
import { CadastroComposicaoRegraComponent } from './cadastro-composicao-regra/cadastro-composicao-regra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
 
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
    AlgumaCoisaComponent,
    ModalComponent,
    CadastroSegmentoRVComponent,
    CadastroComposicaoRegraComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    CommonModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
