import {Entity} from "../../core/infra/entity";
import {Responsavel} from "../responsavel/responsavel";

export interface Catequizando extends Entity<number> {
    idPai?: number,
    idMae?: number,
    nome: string,
    idEtapa: number,
    cidadeNascimento: string,
    dtNascimento: Date,
    endereco: string,
    cep: string,
    telefoneFixo: string,
    telefoneMovel: string,
    email: string,
    paroquiaBatismo: string,
    arquidioceseBatismo: string,
    cidadeDioceseBatismo: string,
    ufDioceseBatismo: string,
    resideCom: string,
    dadosMae?: Responsavel,
    dadosPai?: Responsavel
}