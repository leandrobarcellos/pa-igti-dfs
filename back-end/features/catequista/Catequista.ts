import {Entity} from "../../core/Entity";

export interface Catequista extends Entity<number> {
    idEtapa: number;
    nome: string,
    email: string,
    telefoneFixo?: string | undefined,
    telefoneCelular: string,
    endereco: string,
    casado: 'S' | 'N'
}