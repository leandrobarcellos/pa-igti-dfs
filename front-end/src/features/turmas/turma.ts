import {Catequista} from "../catequistas/catequista";
import {Catequizando} from "../catequizandos/catequizando";
import {Etapa} from "../../../../back-end/src/features/dominios/etapa/etapa";

export interface Turma {
    id?: number,
    idCatequista: number,
    idEtapa: number,
    nome: string
    catequista: Catequista,
    etapa: Etapa,
    catequizandos: Catequizando[],
    inicio: Date
}