import {Turma} from "./Turma";
import {CRUDRepositorySequencial} from "../../core/CRUDRepositorySequencial";

export class TurmaRepository extends CRUDRepositorySequencial<Turma> {

    constructor() {
        super("turmas");
    }

}