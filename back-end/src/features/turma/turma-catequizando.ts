import {Entity} from "../../core/infra/entity";
import {Turma} from "./turma";
import {Catequizando} from "../catequizando/catequizando";

export interface TurmaCatequizandoPK {
    idTurma: number,
    idCatequizando: number,
}

export interface TurmaCatequizando extends Entity<TurmaCatequizandoPK> {
    turma: Turma,
    catequizando: Catequizando
}