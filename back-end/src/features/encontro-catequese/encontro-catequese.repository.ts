import {CrudRepository} from "../../core/infra/crud.repository";
import {EncontroCatequese, EncontroCatequesePK} from "./encontro-catequese";

export class EncontroCatequeseRepository extends CrudRepository<EncontroCatequesePK, EncontroCatequese>{

    constructor() {
        super('encontros-catequese');
    }

}
