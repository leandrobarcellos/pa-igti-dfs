import {Entity} from "../../core/Entity";

export interface Usuario extends Entity{
    email: string,
    nome?: string,
    telefone?: string,
}