import {Catequista} from "./Catequista";
import {CRUDRepositorySequencial} from "../../core/CRUDRepositorySequencial";
import {APIException} from "../../core/exception/APIException";

export class CatequistaRepository extends CRUDRepositorySequencial<Catequista> {

    constructor() {
        super("catequistas");
    }

    findByEmail(email: string): Catequista {
        let c = this.db.rows.find(p => p.email === email);
        if (!c)
            throw new APIException("Catequista não encontrado com o email informado.", 404);
        return c;
    }
}