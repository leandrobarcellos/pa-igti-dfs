import {TurmaRepository} from "./turma.repository";
import {Turma} from "./turma";
import {CatequistaRepository} from "../catequista/catequista.repository";
import {CatequizandoRepository} from "../catequizando/catequizando.repository";
import {TurmaCatequizandoService} from "./turma-catequizando.service";
import {BadRequestException} from "@nestjs/common";
import {FieldChecker} from "../../core/infra/field.checker";
import {TurmaCatequizando, TurmaCatequizandoPK} from "./turma-catequizando";
import {EtapaRepository} from "../dominios/etapa/etapa.repository";

export class TurmaService {

    private repo: TurmaRepository;
    private turmaCatequizandoService: TurmaCatequizandoService;
    private catequistaRepo: CatequistaRepository;
    private catequizandoRepo: CatequizandoRepository;
    private etapaRepo: EtapaRepository;

    constructor() {
        this.repo = new TurmaRepository();
        this.catequistaRepo = new CatequistaRepository();
        this.catequizandoRepo = new CatequizandoRepository();
        this.turmaCatequizandoService = new TurmaCatequizandoService();
        this.etapaRepo = new EtapaRepository();
    }

    public incluir(turma: Turma): void {
        const validated = this.getValidated(turma);
        const {catequizandos, ...aTurma} = validated;
        this.repo.save(aTurma);
        catequizandos.forEach(c => {
            const id: TurmaCatequizandoPK = {idCatequizando: c.id, idTurma: aTurma.id};
            const turmaCatequizando: TurmaCatequizando = {id};
            console.log("incluir.turmaCatequizando", turmaCatequizando);
            this.turmaCatequizandoService.incluir(turmaCatequizando);
        })
    }

    public alterar(turma: Turma): void {
        this.repo.update(turma);
    }

    public excluir(id: number): void {
        const turmaCatequizando = this.turmaCatequizandoService.findByIdTurma(id);
        if (turmaCatequizando && 0 < turmaCatequizando.length) {
            throw new BadRequestException("Já existes catequizandos a essa turma.")
        }
        this.repo.delete(id);
    }

    public find(id?: number): Turma | Turma[] {
        if (id) {
            return this.repo.findById(id);
        }
        return this.repo.findAll();
    }

    public findAll(): Turma[] {
        const turmas = this.repo.findAll();
        turmas.forEach(t=> {
            try {
                console.log("turmas.forEach", t);
                t.catequista = this.catequistaRepo.findById(t.idCatequista);
                console.log("this.catequistaRepo.findById", t.catequista);
                t.etapa = this.etapaRepo.findById(t.idEtapa);
                console.log("this.etapaRepo.findById", t.etapa);
                const turmaCatequizandos = this.turmaCatequizandoService.findByIdTurma(t.id);
                console.log("this.turmaCatequizandoService.findByIdTurma", turmaCatequizandos);
                const ids = turmaCatequizandos.map(tc => tc.id.idCatequizando);
                t.catequizandos = this.catequizandoRepo.findByIdsCatequizandos(ids);
                console.log("this.catequizandoRepo.findByIdsCatequizandos", t.catequizandos);
            }catch (e){
                //nobody see it
            }
        })
        return turmas;
    }

    public findById(idTurma: any): Turma {
        return this.repo.findById(idTurma);
    }

    private getValidated(turma: Turma) {
        const {id, nome, idEtapa, idCatequista, dataInicio, catequizandos} = turma;
        FieldChecker.begin()
            .checkIfUndefinedOrNull(nome, 'Informe um nome')
            .checkIfUndefinedOrNull(idEtapa, 'Selecione uma etapa.')
            .checkIfUndefinedOrNull(idCatequista, 'Selecione um catequista.')
            .checkIfUndefinedOrNull(dataInicio, 'Informe uma data de início.')
            .checkIfHasItens(catequizandos, 'Selecione um ou mais catequizandos.')
            .validate();
        return {id, nome, idEtapa, idCatequista, dataInicio, catequizandos};
    }
}
