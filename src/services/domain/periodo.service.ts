import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { IndicadorDTO } from 'src/models/Indicador.dto';
import { PeriodoDTO } from 'src/models/Periodo.dto';

@Injectable()
export class PeriodoService {

    constructor(public http: HttpClient,
        private toast: ToastrService) {
    }


    getAll(): Observable<PeriodoDTO[]> {
        return this.http.get<PeriodoDTO[]>(`${API_CONFIG.baseUrl}/periodo`);
    }


}