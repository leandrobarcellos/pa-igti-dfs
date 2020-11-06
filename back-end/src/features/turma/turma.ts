import {Catequizando} from "../catequizando/catequizando";
import {Entity} from "../../core/infra/entity";
import {Catequista} from "../catequista/catequista";
import {Etapa} from "../dominios/etapa/etapa";

export interface Turma extends Entity<number> {
    idCatequista: number,
    idEtapa: number,
    nome: string,
    dataInicio: Date,
    catequista?: Catequista,
    etapa?: Etapa,
    catequizandos?: Catequizando[],
}
