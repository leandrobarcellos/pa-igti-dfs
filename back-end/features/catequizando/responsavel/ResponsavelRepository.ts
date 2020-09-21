import {Responsavel} from "./Responsavel";
import {CRUDRepositorySequencial} from "../../../core/CRUDRepositorySequencial";

export class ResponsavelRepository extends CRUDRepositorySequencial<Responsavel> {
    constructor() {
        super("responsaveis");
    }
}