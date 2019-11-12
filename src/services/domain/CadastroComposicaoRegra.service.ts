import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';
import {Indicadores} from 'src/models/Indicadores.dto';
import {CadastroComposicaoRegraDTO} from 'src/models/CadastroComposicaoRegra.dto';


@Injectable()
export class CadastroComposicaoRegraService {
    constructor(public http: HttpClient) {
    }

    
     
    
    getEmpresa(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/empresa`);
    }

    getProduto(codEmpresa:number){
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/produto/${codEmpresa}`);
    }
    
    getRamo(codProduto:number){
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/ramo/${codProduto}`)
    }
    getModalidade(codRamo:number){
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/modalidade/${codRamo}`)
    }
    getGrupo(numGrupoModalidade:number): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/grupo/${numGrupoModalidade}`)
    }
    getSubgrupo(numGrupo:number): Observable<[]>{
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroComposicaoRegra/subGrupo/${numGrupo}`)
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

    delete(id : number){
        return this.http.delete(
            `${API_CONFIG.baseUrl}/cadastroComposicaoRegra/deletarDadosComposicao/${id}`
        
        )
    }

}
