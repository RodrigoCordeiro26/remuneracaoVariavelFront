import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from 'src/config/api.config';
import { CadastroSegmentoRVDTO } from 'src/models/CadastroSegmentoRV.dto';
import { Observable } from 'rxjs/internal/Observable';
import { FiltrosDTO } from 'src/models/Filtros.dto';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable()
export class CadastroSegmentoService{
    constructor(public http: HttpClient,
                private toast : ToastrService) {
    }
    insert(obj : CadastroSegmentoRVDTO) {
        const res = this.http.post(
            `${API_CONFIG.baseUrl}/segmentos-rv`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ).toPromise().catch(error=>{
            this.toast.error("Não foi possível realizar o cadastro. Verifique a conexão com a internet e/ou os dados informados");
        }); 

        if(res != null){
            this.toast.success("Cadastro do Segmento realizado com sucesso")
            setTimeout(() => {
                location.reload()
            }, 2000);
            
        }
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


    update(obj : CadastroSegmentoRVDTO, tipo: String) {
      const res = this.http.put(
            `${API_CONFIG.baseUrl}/segmentos-rv`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ).toPromise().catch(error=>{
            this.toast.error("Não foi possível realizar a atualização do segmento. Verifique a conexão com a internet e/ou os dados informados");
        }); ; 

        if(res != null){
            if(status !== 'STATUS'){
            this.toast.success("O segmento foi atualizado com sucesso!")
            setTimeout(() => {
                location.reload()
            }, 2000);
        }else{
            this.toast.success("O status do segmento foi alterado com sucesso!");
        }
        }
    }

    inativar(obj : CadastroSegmentoRVDTO) {
        const res = this.http.put(
              `${API_CONFIG.baseUrl}/segmentos-rv`, 
              obj,
              { 
                  observe: 'response', 
                  responseType: 'text'
              }
          ).toPromise().catch(error=>{
              this.toast.error("Não foi possível inativar/ativar o segmento");
          }); ; 
  
          if(res != null){
              
              
          }
      }
}