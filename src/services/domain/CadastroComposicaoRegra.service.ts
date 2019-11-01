import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/internal/Observable';
import { empresaDTO } from 'src/models/Empresa.dto';

@Injectable()
export class CadastroComposicaoRegraService {
    constructor(public http: HttpClient) {
    }
    getAll(): Observable<empresaDTO[]> {
        return this.http.get<empresaDTO[]>(`${API_CONFIG.baseUrl}/empresa`);
    }
}
