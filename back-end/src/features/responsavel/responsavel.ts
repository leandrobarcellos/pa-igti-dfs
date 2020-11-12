import {Entity} from "../../core/infra/entity";
import {User} from "../../core/security/user/user";

export interface Responsavel extends Entity<number> {
    idUsuario: number;
    nome: string;
    parentesco: 'MAE'| 'PAI';
    endereco: string;
    cep: string;
    telefoneFixo: string;
    telefoneMovel: string;
    email: string;
    religiao: string;
    praticante: 'S' | 'N';
    user?: User;
}
