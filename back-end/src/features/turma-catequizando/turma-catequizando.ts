import {Entity} from "../../core/infra/entity";

export interface TurmaCatequizandoPK {
    idTurma: number;
    idCatequizando: number;
}

export interface TurmaCatequizando extends Entity<TurmaCatequizandoPK> {

}
