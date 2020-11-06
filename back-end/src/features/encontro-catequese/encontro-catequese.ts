import {Entity} from "../../core/infra/entity";
import {Turma} from "../turma/turma";

export interface EncontroCatequesePK {
    idTurma: number;
    dataEncontro: Date;
}

export interface EncontroCatequese extends Entity<EncontroCatequesePK> {
    turma?: Turma;
}
