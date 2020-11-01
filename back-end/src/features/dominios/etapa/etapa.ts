import {Entity} from "../../../core/infra/entity";

export interface Etapa extends Entity<number> {
    codigo: string,
    nome: string
}