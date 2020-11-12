import {Responsavel} from "../responsaveis/responsavel";
import {Etapa} from "../../util/domain/etapa";

export interface Catequizando {
    id?: number,
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
    dadosPai?: Responsavel,
    etapa?: Etapa
}
