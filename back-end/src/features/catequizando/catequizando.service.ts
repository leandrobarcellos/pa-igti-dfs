import {CatequizandoRepository} from "./catequizando.repository";
import {Catequizando} from "./catequizando";
import {Util} from "../../core/util/Util";
import {ResponsavelService} from "../responsavel/responsavel.service";
import {BadRequestException, Injectable} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";
import {TurmaCatequizandoRepository} from "../turma/turma-catequizando.repository";
import {EtapaRepository} from "../dominios/etapa/etapa.repository";

@Injectable()
export class CatequizandoService {

    constructor(private readonly repository: CatequizandoRepository,
                private readonly turmaCatequizandoRepo: TurmaCatequizandoRepository,
                private readonly etapaRepo: EtapaRepository,
                private readonly responsavelService: ResponsavelService) {
    }

    public consultarCatequizandosPorIdTurma(idTurma: number): Catequizando[] {
        const idsCatequizandos = this.turmaCatequizandoRepo.findIdsCatequizandosByIdTurma(idTurma);
        const catequizandos = this.repository.findByIdsCatequizandos(idsCatequizandos);
        catequizandos.forEach(c => this.configurarRelacionamentos(c));
        return catequizandos;
    }

    public salvarCatequizando(catequizando: Catequizando): Catequizando {
        const validated = this.getValidated(catequizando);
        this.repository.save(validated);
        return validated;
    }

    public atualizarCatequizando(id: number, catequizando: Catequizando): Catequizando {
        const validated = this.getValidated(catequizando);
        if (id && validated) {
            if (validated.id && (validated.id != id)) {
                throw new BadRequestException("Não foi possível definir o identificador a ser utilizado na atualização");
            }
            if (!Util.isUndefinedOrNull(id)) {
                console.log("this.repository.update", validated);
                this.repository.update(validated);
            }
        }
        return validated;
    }

    public findAll(): Catequizando[] {
        const catequizandos = this.repository.findAll();
        catequizandos.forEach(c => this.configurarRelacionamentos(c));
        return catequizandos;
    }

    private configurarRelacionamentos(c: Catequizando) {
        try{
            c.dadosMae = this.responsavelService.findById(c.idMae);
            c.dadosPai = this.responsavelService.findById(c.idPai);
        }catch (e){
            if(!c.dadosMae && !c.dadosPai){
                throw new BadRequestException("Inconsistência nos dados do catequizando.");
            }
        }
        c.etapa = this.etapaRepo.findById(c.idEtapa);
    }

    public findById(id: number): Catequizando {
        const c = this.repository.findById(id);
        this.configurarRelacionamentos(c);
        return c;
    }

    public deleteCatequizando(id: number): void {
        const turmaCatequizando = this.turmaCatequizandoRepo.findByIdCatequizando(id);
        if (turmaCatequizando && 0 < turmaCatequizando.length) {
            throw new BadRequestException("O Catequizando já foi inscrito em turmas.");
        }
        this.repository.delete(id);
    }

    private getValidated(catequizando: Catequizando) {
        const {
            id, ufDioceseBatismo, resideCom, cidadeNascimento, arquidioceseBatismo,
            paroquiaBatismo, email, telefoneMovel, telefoneFixo, endereco, dtNascimento,
            idEtapa, idPai, idMae, cep, nome, cidadeDioceseBatismo
        } = catequizando;

        console.log(catequizando);
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
            .checkIf(c => !Util.isTelefoneOk(telefoneFixo, 8)
                && Util.isTelefoneOk(telefoneMovel, 9), 'Informe ao menos um telefone: Movel ou Fixo.')
            .checkIf(c => !idPai && !idMae, 'O pai ou a mãe devem ser informados.')
            .validate();

        return {
            id, ufDioceseBatismo, resideCom, cidadeNascimento, arquidioceseBatismo,
            paroquiaBatismo, email, telefoneMovel, telefoneFixo, endereco, dtNascimento,
            idEtapa, idPai, idMae, cep, nome, cidadeDioceseBatismo
        };
    }

    findByIdEtapa(idEtapa: number) {
        const catequizandos = this.repository.filter(c => c.idEtapa == idEtapa);
        catequizandos.forEach(c => this.configurarRelacionamentos(c));
        return catequizandos;
    }

    findByIdsResponsaveis(idsResponsaveis: number[]) {
        const catequizandos = this.repository.findByIdsResponsaveis(idsResponsaveis);
        catequizandos.forEach(c => this.configurarRelacionamentos(c));
        return catequizandos;
    }

    findByIdUsuario(idUsuario: number) {
        const responsaveis = this.responsavelService.findByIdUsuario(idUsuario);
        const idsResponsaveis = responsaveis.map(r => Number(r.id));
        console.log("idsResponsaveis", idsResponsaveis);
        const catequizandos = this.repository.findByIdsResponsaveis(idsResponsaveis);
        catequizandos.forEach(c => this.configurarRelacionamentos(c));
        return catequizandos;
    }
}
