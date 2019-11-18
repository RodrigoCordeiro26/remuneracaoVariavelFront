
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';
import { legiveisDTO } from "src/models/Legiveis.dto";

@Injectable()
export class LegivelService{

    constructor(public http: HttpClient) {
    }


    getComposicao(): Observable<legiveisDTO[]>{
        return this.http.get<legiveisDTO[]>(`${API_CONFIG.baseUrl}/rh/buscarTodosLegiveisRH`);
    }

    insert(obj : legiveisDTO[]) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/rh/salvarLegiveisRH`, obj 
            
             ) 
    }

}

