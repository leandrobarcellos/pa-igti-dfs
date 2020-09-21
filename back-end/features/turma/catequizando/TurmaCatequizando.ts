import {Entity} from "../../../core/Entity";
import {Turma} from "../Turma";
import {Catequizando} from "../../catequizando/Catequizando";

export interface TurmaCatequizandoPK {
    idTurma: number,
    idCatequizando: number,
}

export interface TurmaCatequizando extends Entity<TurmaCatequizandoPK> {
    turma: Turma,
    catequizando: Catequizando
}