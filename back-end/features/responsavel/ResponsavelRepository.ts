import {Responsavel} from "./Responsavel";
import {CRUDRepositorySequencial} from "../../core/CRUDRepositorySequencial";
import {APIException} from "../../core/exception/APIException";

export class ResponsavelRepository extends CRUDRepositorySequencial<Responsavel> {
    constructor() {
        super("responsaveis");
    }

    findByEmail(email: string): Responsavel {
        let find = this.db.rows.find(p => p.email === email);
        // if (!find)
        //     throw new APIException("Responsável não encontrado.", 404);
        find = {
            email
        } as Responsavel;
        return find;
    }
}