import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { IndicadorDTO } from 'src/models/Indicador.dto';

@Injectable()
export class IndicadorService {

    constructor(public http: HttpClient,
        private toast: ToastrService) {
    }


    getAll(): Observable<IndicadorDTO[]> {
        return this.http.get<IndicadorDTO[]>(`${API_CONFIG.baseUrl}/indicador`);
    }


}