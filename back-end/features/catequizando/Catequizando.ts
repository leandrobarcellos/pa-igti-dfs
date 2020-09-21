import {Entity} from "../../core/Entity";
import {Responsavel} from "./responsavel/Responsavel";

export interface Catequizando extends Entity<number> {
    idPai: number,
    idMae: number,
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
    cidadeDiocese: string,
    ufDiocese: string,
    resideCom: string,
    dadosMae: Responsavel,
    dadosPai: Responsavel
}