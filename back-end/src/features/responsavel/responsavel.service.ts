import {ResponsavelRepository} from "./responsavel.repository";
import {Responsavel} from "./responsavel";
import {BadRequestException, Injectable} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";
import {CatequizandoRepository} from "../catequizando/catequizando.repository";

@Injectable()
export class ResponsavelService {
    private readonly repository: ResponsavelRepository;
    private catequizandoRepo: CatequizandoRepository;

    constructor() {
        this.repository = new ResponsavelRepository();
        this.catequizandoRepo = new CatequizandoRepository();
    }

    public salvar(responsavel: Responsavel): Responsavel {
        const validated = this.getValidated(responsavel);
        this.repository.save(validated);
        return validated;
    }

    public atualizar(responsavel?: Responsavel): void {
        const validated = this.getValidated(responsavel);
        this.repository.update(validated);
    }

    public consultarPorId(id: number): Responsavel {
        return this.repository.findById(id);
    }


    public findByEmail(email: any): Responsavel {
        return this.repository.findByEmail(email);
    }

    public findAll(): Responsavel[] {
        return this.repository.findAll();
    }

    public findById(idResponsavel: number): Responsavel {
        return this.repository.findById(idResponsavel);
    }

    private getValidated(responsavel: Responsavel) {
        console.log("private getValidated(responsavel: Responsavel)", responsavel);
        const {
            id, telefoneFixo, telefoneMovel, endereco, cep,
            email, idUsuario, nome, parentesco, praticante, religiao
        } = responsavel;
        FieldChecker.begin()
            .checkIfNull(endereco, 'Informe o telefone fixo.')
            .checkIfNull(cep, 'Informe o CEP')
            .checkIfNull(parentesco, 'Informe o Parentesco')
            .checkIfNull(email, 'Informe um email válido')
            .checkIfNull(idUsuario, 'Para realizar a operação é necessário um usuário válido.')
            .checkIfNull(nome, 'Informe o nome')
            .checkIfNull(praticante, 'Informe se o responsável é praticante ou não.')
            .checkIfNull(religiao, 'Informe a religião do responsável.')
            .validate();
        if ((!telefoneFixo || 8 < telefoneFixo.length) &&
            (!telefoneMovel || 9 < telefoneMovel.length)) {
            throw new BadRequestException('Informe um telefone válido para Movel ou Fixo');
        }
        return {
            id, telefoneFixo, telefoneMovel, endereco, cep,
            email, idUsuario, nome, parentesco, praticante, religiao
        };
    }

    public excluir(idResponsavel: number) {
        const catequizandos = this.catequizandoRepo.findCatequizandosByIdResponsavel(idResponsavel);
        if (catequizandos || 0 < catequizandos.length) {
            throw new BadRequestException("Existem catequizandos associados ao responsável.");
        }
        this.repository.delete(idResponsavel);
    }
}
