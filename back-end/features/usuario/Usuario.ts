import {Entity} from "../../core/Entity";

export interface Usuario extends Entity<number>{
    email: string,
    nome?: string,
    tipo: string,
    senha: string
}