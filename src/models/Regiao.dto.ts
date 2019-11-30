import{RegiaoTetoFaixa} from 'src/models/RegiaoTetoFaixa.dto'

export interface Regiao{
    cdRegiao:number,
    nmRegiao:string,
    regiaoTetoFaixaDomain:RegiaoTetoFaixa[],
    diretoria:any[],
    sucursal:any[],
    regional:any[]
}

