import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';
import {Regiao} from 'src/models/Regiao.dto'



@Injectable()
export class CadastroRegioesService{
    constructor(public http: HttpClient) {
    }

    getCargo(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarCargos`);
    }

    getDiretoria(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarDiretoria`);
    }

    getSucursal(codDiretoria : any[]): Observable<[]> {
        return this.http.post<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarSurcursal`,codDiretoria)
    }

    getRegional( codSucursal : any[]): Observable<[]> {
        return this.http.post<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarRegional` , codSucursal);
    }

    getRegioes(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarRegioes`);
    }


    insert(obj : Regiao) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/cadastroRegioes/salvarRegioes`, obj 
            
             ) 
    }

}