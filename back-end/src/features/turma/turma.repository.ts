import {Turma} from "./turma";
import {CrudSequencialRepository} from "../../core/infra/crud-sequencial.repository";

export class TurmaRepository extends CrudSequencialRepository<Turma> {

    constructor() {
        super("turmas");
    }

}