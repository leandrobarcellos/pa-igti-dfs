import {EncontroCatequeseRepository} from "./encontro-catequese.repository";
import {EncontroCatequese, EncontroCatequesePK} from "./encontro-catequese";
import {BadRequestException} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";

export class EncontroCatequeseService {
    private repository: EncontroCatequeseRepository;

    constructor() {
        this.repository = new EncontroCatequeseRepository();
    }

    public save(entity: EncontroCatequese) {
        const validated = this.getValidated(entity);
        const found = this.repository.findById(validated.id);
        if (found) {
            throw new BadRequestException('O encontro já foi registrado.');
        }
        return this.repository.save(validated);
    }

    private getValidated(entity: EncontroCatequese): EncontroCatequese {
        if (!entity)
            throw new BadRequestException('Não é possível persistir entidade nula/undefined.');
        const {idTurma, dataEncontro} = entity.id;
        FieldChecker.begin()
            .checkIfNull(idTurma, `Informe a turma.`)
            .checkIfNull(dataEncontro, `Informe a data do encontro.`)
            .validate();
        const id = {idTurma, dataEncontro};
        return {id};
    }

    findById(pk: EncontroCatequesePK): EncontroCatequese {
        return this.repository.findById(pk);
    }
}
