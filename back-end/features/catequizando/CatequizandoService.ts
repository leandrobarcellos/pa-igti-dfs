import {CatequizandoRepository} from "./CatequizandoRepository";
import {Catequizando} from "./Catequizando";
import {ResponsavelService} from "../responsavel/ResponsavelService";
import {Responsavel} from "../responsavel/Responsavel";
import {APIException} from "../../core/exception/APIException";
import {Util} from "../../core/util/Util";
import {TurmaCatequizandoRepository} from "../turma/catequizando/TurmaCatequizandoRepository";

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
        let idsCatequizandos = this.turmaCatequizandoRepo.findIdsCatequizandosByIdTurma(idTurma);
        return this.repository.findByIdsCatequizandos(idsCatequizandos);
    }

    public salvarCatequizando(catequizando: Catequizando): void {
        this.salvarResponsavel(catequizando.dadosMae);
        this.salvarResponsavel(catequizando.dadosPai);
        this.validarResponsavel(catequizando.dadosMae, catequizando.idMae);
        this.validarResponsavel(catequizando.dadosPai, catequizando.idMae);
        this.repository.save(catequizando);
    }

    private salvarResponsavel(responsavel?: Responsavel) {
        if (responsavel) {
            if (!responsavel.id) {
                this.responsavelService.salvar(responsavel);
            } else {
                let found = this.responsavelService.consultarPorId(responsavel.id);
                Object.assign(responsavel, found);
            }
        }
    }

    private validarResponsavel(responsavel?: Responsavel, idResponsavel?: number) {
        if (idResponsavel && (responsavel && responsavel.id)) {
            if (idResponsavel != responsavel.id) {
                throw new APIException("Não foi possível definir o identificador a ser utilizado na inclusão.", 400);
            }
        }
    }

    public atualizarCatequizando(id: number, catequizando: Catequizando): void {
        if (id && catequizando) {
            if (catequizando.id && (catequizando.id != id)) {
                throw new APIException("Não foi possível definir o identificador a ser utilizado na atualização", 400);
            }
            if (!Util.isUndefinedOrNull(id)) {
                this.repository.update(catequizando);
                this.responsavelService.atualizar(catequizando.dadosMae);
                this.responsavelService.atualizar(catequizando.dadosPai);
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

}