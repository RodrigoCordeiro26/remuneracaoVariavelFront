import{Cargo} from 'src/models/cargo.dto'
export interface RegiaoTetoFaixa{
    cdCargo:number,  
    teto:number,
    faixaDe:number,
    faixaAte:number,
    cargoDomain:Cargo
}

