import {Turma} from "./turma";
import {CrudSequencialRepository} from "../../core/infra/crud-sequencial.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TurmaRepository extends CrudSequencialRepository<Turma> {

    constructor() {
        super("turmas");
    }

}
