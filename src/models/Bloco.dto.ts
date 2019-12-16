import { RegraDTO } from './Regra.dto';
import { PeriodoDTO } from './Periodo.dto';
import { SegmentosDTO } from './Segmentos.dto';
import { TipoRemuneracaoDTO } from './TipoRemuneracao.dto';

export interface Bloco {
    id : number,
    valorTaxa: any,
    indicadorTaxa: String,
    agravoTaxa: String,
    lsRegra : RegraDTO[],
    blocoObrigatorio : Boolean,
    indcProporcionalidade: Boolean,
    lsSegmento: SegmentosDTO[],
    lsTipoRemuneracao: TipoRemuneracaoDTO[]
}