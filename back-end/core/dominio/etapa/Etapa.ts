import {Entity} from "../../Entity";

export interface Etapa extends Entity<number> {
    codigo: string,
    nome: string
}