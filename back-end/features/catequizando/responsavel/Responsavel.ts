import {Entity} from "../../../core/Entity";

export interface Responsavel extends Entity<number> {
    nome: string,
    endereco: string,
    cep: string,
    telefoneFixo: string,
    telefoneMovel: string,
    email: string,
    religiao: string,
    praticante: 'S' | 'N'
}
