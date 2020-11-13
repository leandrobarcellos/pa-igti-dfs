import {Entity} from "../../core/infra/entity";

export interface Catequista extends Entity<number> {
    idEtapa: number;
    nome: string,
    email: string,
    telefoneFixo?: string | undefined,
    telefoneMovel: string,
    endereco: string,
    casado: 'S' | 'N'
}
