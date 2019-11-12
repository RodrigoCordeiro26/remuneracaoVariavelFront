import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class CadastroRegioesService{
    constructor(public http: HttpClient) {
    }

    getCargo(): Observable<[]> {
        return this.http.get<[]>(`${API_CONFIG.baseUrl}/cadastroRegioes/buscarCargos`);
    }

    insert(obj : []) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/cadastroRegioes/salvarRegioes`, obj 
            
             ) 
    }

}