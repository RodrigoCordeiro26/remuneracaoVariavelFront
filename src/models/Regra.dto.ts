import { PeriodoDTO } from './Periodo.dto';

export interface RegraDTO{
    id: Number
    indicadorRegra: String,
    agravo: String,
    valorMinimo: any,
    valorMaximo: any,
    periodo: Number,
    referencia: Number,
    pesoRegra: Number,
}