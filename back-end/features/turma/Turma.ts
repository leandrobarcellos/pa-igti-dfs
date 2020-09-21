import {Entity} from "../../core/Entity";
import {Catequizando} from "../catequizando/Catequizando";
import {Catequista} from "../catequista/Catequista";
import {Etapa} from "../../core/dominio/etapa/Etapa";

export interface Turma extends Entity<number> {
    idCatequista: number,
    idEtapa: number,
    nome: string
    catequista: Catequista,
    etapa: Etapa,
    catequizandos: Catequizando[],
    inicio: Date
}