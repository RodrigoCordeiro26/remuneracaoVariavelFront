import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Bloco } from 'src/models/Bloco.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';

@Injectable()
export class RegraService {
    constructor(public http: HttpClient,
        private toast: ToastrService) {
    }

    insert(obj: Bloco) {
        const res = this.http.post(
            `${API_CONFIG.baseUrl}/regras`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        ).toPromise().catch(error => {
            this.toast.error("Não foi possível realizar o cadastro. Verifique a conexão com a internet e/ou os dados informados");
        });

        if (res != null) {
            this.toast.success("Regra cadastrada com sucesso!")
            setTimeout(() => {
                location.reload()
            }, 2000);

        }
    }

    getAll():Observable<Bloco[]>{
        return this.http.get<Bloco[]>(`${API_CONFIG.baseUrl}/regras`);
    }

    delete(id: Number){
        const res = this.http.delete(
            `${API_CONFIG.baseUrl}/regras?id=` + id,
            {
                observe: 'response',
                responseType: 'text'
            }
        ).toPromise().catch(error => {
            this.toast.error("Não foi possível deletar as Regras");
            setTimeout(() => {
                location.reload()
            }, 2000);
        });

        this.toast.success("Regra excluida com sucesso!")
            setTimeout(() => {
                location.reload()
            }, 2000);
    }

    update(obj: Bloco){
        const res = this.http.put(
            `${API_CONFIG.baseUrl}/regras`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        ).toPromise().catch(error => {
            this.toast.error("Não foi possível atualizar as Regras");
        });;
    }



    
}