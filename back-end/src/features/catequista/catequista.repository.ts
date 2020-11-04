import {CrudSequencialRepository} from "../../core/infra/crud-sequencial.repository";
import {Catequista} from "./catequista";
import {NotFoundException} from "@nestjs/common";

export class CatequistaRepository extends CrudSequencialRepository<Catequista> {

    constructor() {
        super("catequistas");
    }

    findByEmail(email: string): Catequista {
        const c = this.db.rows.find(p => p.email === email);
        if (!c)
            throw new NotFoundException("Catequista não encontrado com o username informado.");
        return c;
    }

    findByIdEtapa(idEtapa: number) {
        return this.filter(c => c.idEtapa === idEtapa);
    }
}
