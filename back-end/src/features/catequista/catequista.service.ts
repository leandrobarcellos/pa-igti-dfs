import {BadRequestException, Injectable} from '@nestjs/common';

import {Catequista} from "./catequista";
import {CatequistaRepository} from "./catequista.repository";
import {FieldChecker} from "../../core/infra/field.checker";
import {Util} from "../../core/util/util";
import {TurmaService} from "../turma/turma.service";

@Injectable()
export class CatequistaService {
    private repo: CatequistaRepository;

    constructor(
        private readonly turmaService: TurmaService
    ) {
        this.repo = new CatequistaRepository();
    }

    public findById(accountId: number): Catequista {
        return this.repo.findById(accountId);
    }

    public findByIdEtapa(idEtapa: number): Catequista[] {
        return this.repo.findByIdEtapa(idEtapa);
    }

    public findAll(): Catequista[] {
        return this.repo.findAll();
    }

    salvarCatequista(catequista: Catequista): void {
        const validated = this.getValidated(catequista);
        this.repo.save(validated);
    }

    atualizarCatequista(catequista: Catequista) {
        const validated = this.getValidated(catequista);
        this.repo.update(validated);
    }

    deleteCatequista(catequistaId: number) {
        const turmas = this.turmaService.findByIdCatequista(catequistaId);
        if(turmas && 0 < turmas.length){
            throw new BadRequestException('O catequista já possui turmas.');
        }
        this.repo.delete(catequistaId);
    }

    public findByEmail(email: string): Catequista {
        return this.repo.findByEmail(email);
    }

    private getValidated(catequista: Catequista): Catequista {
        const {id, idEtapa, casado, endereco, telefoneMovel, telefoneFixo, email, nome} = catequista;
        FieldChecker.begin(catequista)
            .checkIfUndefinedOrNull(idEtapa, 'Informe a etapa.')
            .checkIfUndefinedOrNull(casado, 'Informe o estado civil.')
            .checkIfUndefinedOrNull(endereco, 'Informe o endereço.')
            .checkIfUndefinedOrNull(email, 'Informe o email.')
            .checkIfUndefinedOrNull(nome, 'Informe o nome.')
            .checkIf(() => !Util.isTelefoneOk(telefoneMovel, 9), 'Informe um telefone móvel válido.')
            .validate();
        return {id, idEtapa, casado, endereco, telefoneMovel, telefoneFixo, email, nome} as Catequista;
    }
}
