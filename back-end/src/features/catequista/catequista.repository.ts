import {ApiException} from "../../core/exception/api.exception";
import {CrudSequencialRepository} from "../../core/infra/crud-sequencial.repository";
import {Catequista} from "./catequista";

export class CatequistaRepository extends CrudSequencialRepository<Catequista> {

    constructor() {
        super("catequistas");
    }

    findByEmail(email: string): Catequista {
        const c = this.db.rows.find(p => p.email === email);
        if (!c)
            throw new ApiException("Catequista não encontrado com o username informado.", 404);
        return c;
    }

    findByIdEtapa(idEtapa: number) {
        return this.filter(c => c.idEtapa === idEtapa);
    }
}