import {TurmaCatequizandoRepository} from "./turma-catequizando.repository";
import {TurmaCatequizando, TurmaCatequizandoPK} from "./turma-catequizando";

export class TurmaCatequizandoService {

    private readonly repository: TurmaCatequizandoRepository;

    constructor() {
        this.repository = new TurmaCatequizandoRepository();
    }

    public incluir(turmaCatequizando: TurmaCatequizando): void {
        this.repository.save(turmaCatequizando);
    }

    public alterar(turmaCatequizando: TurmaCatequizando): void {
        this.repository.update(turmaCatequizando);
    }

    public excluir(id: TurmaCatequizandoPK): void {
        this.repository.delete(id);
    }

    public find(id?: TurmaCatequizandoPK): TurmaCatequizando | TurmaCatequizando[] {
        if (id) {
            return this.repository.findById(id);
        }
        return this.repository.findAll();
    }

    findByIdTurma(idTurma: number): TurmaCatequizando[] {
        return this.repository.filter(t => t.id.idTurma == idTurma);
    }
}