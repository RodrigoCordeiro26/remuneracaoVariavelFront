import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AlgumaCoisaComponent } from './alguma-coisa/alguma-coisa.component';
import { ModalComponent } from './modal/modal.component';
import { CadastroSegmentoRVComponent } from './cadastro-segmento-rv/cadastro-segmento-rv.component';
import { FormsModule }   from '@angular/forms'
import { CadastroSegmentoService } from 'src/services/domain/cadastroSegmento.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AlgumaCoisaComponent,
    ModalComponent,
    CadastroSegmentoRVComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [
    CadastroSegmentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
