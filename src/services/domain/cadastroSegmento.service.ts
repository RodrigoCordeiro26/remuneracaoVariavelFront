import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { CadastroSegmentoRVDTO } from 'src/models/CadastroSegmentoRV.dto';
import { Observable } from 'rxjs/internal/Observable';



@Injectable()
export class CadastroSegmentoService{
    constructor(public http: HttpClient) {
    }
    insert(obj : CadastroSegmentoRVDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/segmentos-rv`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    getAll(): Observable<CadastroSegmentoRVDTO[]>{
        return this.http.get<CadastroSegmentoRVDTO[]>(`${API_CONFIG.baseUrl}/segmentos-rv`);
    }

    getListByFilter(selected: String, value: String ):Observable<CadastroSegmentoRVDTO[]>{
        return this.http.get<CadastroSegmentoRVDTO[]>(`${API_CONFIG.baseUrl}/segmentos-rv/filtro?selected=${selected}&value=${value}"`)
    }
}