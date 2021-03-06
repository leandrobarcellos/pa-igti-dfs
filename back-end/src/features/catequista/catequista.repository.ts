import {Catequista} from "./catequista";
import {Injectable, NotFoundException} from "@nestjs/common";
import {CrudRepository} from "../../core/infra/crud.repository";

@Injectable()
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
        console.log("findByIdEtapa(idEtapa: number)", idEtapa);
        return this.filter(c => c.idEtapa == idEtapa);
    }
}
