import {Catequista} from "./Catequista";
import {CRUDRepositorySequencial} from "../../core/CRUDRepositorySequencial";

export class CatequistaRepository extends CRUDRepositorySequencial<Catequista> {

    constructor() {
        super("catequistas");
    }

}