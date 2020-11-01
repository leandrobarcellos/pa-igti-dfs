import {Entity} from "../../core/infra/entity";

export interface Catequista extends Entity<number> {
    idEtapa: number;
    nome: string,
    email: string,
    telefoneFixo?: string | undefined,
    telefoneCelular: string,
    endereco: string,
    casado: 'S' | 'N'
}