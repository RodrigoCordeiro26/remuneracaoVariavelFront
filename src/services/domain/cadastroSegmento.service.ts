import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { CadastroSegmentoRVDTO } from 'src/models/CadastroSegmentoRV.dto';
import { Observable } from 'rxjs/internal/Observable';
import { FiltrosDTO } from 'src/models/Filtros.dto';



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

    getListByFilter(filtro: FiltrosDTO ):Observable<CadastroSegmentoRVDTO[]>{
        console.log(filtro.codigo)
        console.log(filtro.src)
        console.log(filtro.opcaoSelectionada)
        return this.http.get<CadastroSegmentoRVDTO[]>(
           
            `${API_CONFIG.baseUrl}/segmentos-rv/filtro?codigo=${filtro.codigo}&segmento=${filtro.src}&selected=${filtro.opcaoSelectionada}`
        );
    }
}