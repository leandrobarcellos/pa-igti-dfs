import {CatequizandoRepository} from "./catequizando.repository";
import {Catequizando} from "./catequizando";
import {Util} from "../../core/util/Util";
import {ResponsavelService} from "../responsavel/responsavel.service";
import {Responsavel} from "../responsavel/responsavel";
import {TurmaCatequizandoRepository} from "../turma/turma-catequizando.repository";
import {BadRequestException} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";

export class CatequizandoService {

    private readonly repository: CatequizandoRepository;
    private readonly turmaCatequizandoRepo: TurmaCatequizandoRepository;
    private readonly responsavelService: ResponsavelService;

    constructor() {
        this.repository = new CatequizandoRepository();
        this.turmaCatequizandoRepo = new TurmaCatequizandoRepository();
        this.responsavelService = new ResponsavelService();
    }

    public consultarCatequizandosPorIdTurma(idTurma: number): Catequizando[] {
        const idsCatequizandos = this.turmaCatequizandoRepo.findIdsCatequizandosByIdTurma(idTurma);
        return this.repository.findByIdsCatequizandos(idsCatequizandos);
    }

    public salvarCatequizando(catequizando: Catequizando): void {
        const mae = this.salvarResponsavel(catequizando.dadosMae);
        const pai = this.salvarResponsavel(catequizando.dadosPai);
        catequizando.idPai = pai.id;
        catequizando.idMae = mae.id;
        const validated = this.getValidated(catequizando);
        this.repository.save(validated);
    }

    private salvarResponsavel(responsavel?: Responsavel): Responsavel {
        let toReturn = {};
        if (responsavel) {
            if (!responsavel.id) {
                toReturn = this.responsavelService.salvar(responsavel);
            } else {
                const found = this.responsavelService.consultarPorId(responsavel.id);
                Object.assign(toReturn, found);
            }
        }
        return toReturn as Responsavel;
    }

    public atualizarCatequizando(id: number, catequizando: Catequizando): void {
        const validated = this.getValidated(catequizando);
        if (id && validated) {
            if (validated.id && (validated.id != id)) {
                throw new BadRequestException("Não foi possível definir o identificador a ser utilizado na atualização");
            }
            if (!Util.isUndefinedOrNull(id)) {
                this.repository.update(validated);
            }
        }
    }

    public findAll(): Catequizando[] {
        return this.repository.findAll();
    }

    public findById(id: number): Catequizando {
        return this.repository.findById(id);
    }

    public deleteCatequizando(id: number): void {
        this.repository.delete(id);
    }

    private getValidated(catequizando: Catequizando) {
        const {
            id, ufDioceseBatismo, resideCom, cidadeNascimento, arquidioceseBatismo,
            paroquiaBatismo, email, telefoneMovel, telefoneFixo, endereco, dtNascimento,
            idEtapa, idPai, idMae, cep, nome, cidadeDioceseBatismo
        } = catequizando;

        FieldChecker.begin()
            .checkIfNull(ufDioceseBatismo, 'Informe a UF da diocese de batismo.')
            .checkIfNull(resideCom, 'Informe com quem o catequizando reside.')
            .checkIfNull(cidadeNascimento, 'Informe a cidade de nascimento do catequizando.')
            .checkIfNull(arquidioceseBatismo, 'Informe a arquidiocese de batismo.')
            .checkIfNull(paroquiaBatismo, 'Informe a paróquia de batismo.')
            .checkIfNull(email, 'Informe o email.')
            .checkIfNull(endereco, 'Informe o endereço.')
            .checkIfNull(dtNascimento, 'Informe a data de nascimento do catequizando.')
            .checkIfNull(idEtapa, 'Informe a etapa de interesse.')
            .checkIfNull(cep, 'Informe o CEP.')
            .checkIfNull(nome, 'Informe o nome.')
            .checkIfNull(cidadeDioceseBatismo, 'Informe a cidade da diocese de batismo.')
            .validate();
        if (!Util.isTelefoneOk(telefoneFixo, 8)
            && Util.isTelefoneOk(telefoneMovel, 9)) {
            throw new BadRequestException('Informe ao menos um telefone: Movel ou Fixo.');
        }

        if (!idPai && !idMae) {
            throw new BadRequestException('O pai ou a mãe devem ser informados.');
        }

        return {
            id, ufDioceseBatismo, resideCom, cidadeNascimento, arquidioceseBatismo,
            paroquiaBatismo, email, telefoneMovel, telefoneFixo, endereco, dtNascimento,
            idEtapa, idPai, idMae, cep, nome, cidadeDioceseBatismo
        };
    }
}
