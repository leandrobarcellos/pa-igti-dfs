import {FrequenciaCatequizandoRepository} from "./frequencia-catequizando.repository";
import {BadRequestException} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";
import {FrequenciaCatequizando, FrequenciaCatequizandoPK} from "./frequencia-catequizando";

export class FrequenciaCatequizandoService {
    private repository: FrequenciaCatequizandoRepository;

    constructor() {
        this.repository = new FrequenciaCatequizandoRepository();
    }

    public save(entity: FrequenciaCatequizando) {
        const validated = this.getValidated(entity);
        const found = this.repository.findById(validated.id);
        if (found) {
            throw new BadRequestException('O encontro já foi registrado.');
        }
        return this.repository.save(validated);
    }

    private getValidated(entity: FrequenciaCatequizando): FrequenciaCatequizando {
        if (!entity)
            throw new BadRequestException('Não é possível persistir entidade nula/undefined.');
        const {idTurma, idCatequizando, dataEncontro} = entity.id;
        const {presente} = entity;

        FieldChecker.begin()
            .checkIfNull(idTurma, `Informe a turma.`)
            .checkIfNull(dataEncontro, `Informe a data do encontro.`)
            .checkIfNull(idCatequizando, `Informe o catequizando.`)
            .checkIfUndefined(presente, `Informe se o catequizando esteve presente ou não.`)
            .validate();
        const id = {idTurma, idCatequizando, dataEncontro};
        return {id, presente};
    }

    findById(pk: FrequenciaCatequizandoPK): FrequenciaCatequizando {
        return this.repository.findById(pk);
    }
}
