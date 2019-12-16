import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TipoRemuneracaoDTO } from 'src/models/TipoRemuneracao.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class TipoRemuneracaoService{
    constructor(public http: HttpClient,
        private toast: ToastrService) {
    }


    getAll():Observable<TipoRemuneracaoDTO[]>{
        return this.http.get<TipoRemuneracaoDTO[]>(`${API_CONFIG.baseUrl}/tipo-remuneracao/dto`);
    }

}