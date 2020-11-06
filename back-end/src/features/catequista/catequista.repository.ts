import {Catequista} from "./catequista";
import {NotFoundException} from "@nestjs/common";
import {CrudRepository} from "../../core/infra/crud.repository";

export class CatequistaRepository extends CrudRepository<number, Catequista> {

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
