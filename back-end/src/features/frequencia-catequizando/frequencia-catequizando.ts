import {Entity} from "../../core/infra/entity";
import {Catequizando} from "../catequizando/catequizando";
import {Turma} from "../turma/turma";

export interface FrequenciaCatequizandoPK {
    idTurma: number;
    idCatequizando: number;
    dataEncontro: number;
}

export interface FrequenciaCatequizando extends Entity<FrequenciaCatequizandoPK> {
    presente: boolean;
    turma?: Turma;
    catequizando?: Catequizando;
}
