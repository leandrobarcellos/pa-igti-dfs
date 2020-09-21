import {Entity} from "../../core/Entity";

export interface Catequista extends Entity<number> {
    nome: string,
    email: string,
    telefoneFixo: string,
    telefoneCelular: string,
    endereco: string,
    casado: 'S' | 'N'
}