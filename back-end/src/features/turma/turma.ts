import {Catequizando} from "../catequizando/catequizando";
import {Entity} from "../../core/infra/entity";
import {Catequista} from "../catequista/catequista";
import {Etapa} from "../dominios/etapa/etapa";

export interface Turma extends Entity<number> {
    idCatequista: number,
    idEtapa: number,
    nome: string
    catequista: Catequista,
    etapa: Etapa,
    catequizandos: Catequizando[],
    inicio: Date
}