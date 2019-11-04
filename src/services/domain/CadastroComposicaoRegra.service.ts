import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';
import {Indicadores} from 'src/models/Indicadores.dto';
import {CadastroComposicaoRegraDTO} from 'src/models/CadastroComposicaoRegra.dto'
import { logWarnings } from 'protractor/built/driverProviders';

@Injectable()
export class CadastroComposicaoRegraService {
    constructor(public http: HttpClient) {
    }
    getEmpresa(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/empresa`);
    }

    getProduto():Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/produto`);
    }
    
    getRamo(): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/ramo`)
    }
    getModalidade(): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/modalidade`)
    }
    getGrupo(): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/grupo`)
    }
    getSubgrupo(): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/subGrupo`)
    }
    getIndicadores(): Observable<Indicadores[]>{
        return this.http.get<Indicadores[]>('assets/data.json')
    }

    getComposicao(): Observable<CadastroComposicaoRegraDTO[]>{
        return this.http.get<CadastroComposicaoRegraDTO[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/composicao`)
    }

    insert(obj : CadastroComposicaoRegraDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/cadastroComposicaoRegra/salvarDadosComposicao`, obj 
            
             ) 
    }

}
