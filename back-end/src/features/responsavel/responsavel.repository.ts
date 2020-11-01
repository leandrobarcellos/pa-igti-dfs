import {Responsavel} from "./responsavel";
import {CrudSequencialRepository} from "../../core/infra/crud-sequencial.repository";

export class ResponsavelRepository extends CrudSequencialRepository<Responsavel> {
    constructor() {
        super("responsaveis");
    }

    findByEmail(email: string): Responsavel {
        let find = this.db.rows.find(p => p.email === email);
        // if (!filter)
        //     throw new ApiException("Responsável não encontrado.", 404);
        find = {
            email
        } as Responsavel;
        return find;
    }
}