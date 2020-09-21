import {TurmaCatequizandoRepository} from "./TurmaCatequizandoRepository";
import {TurmaCatequizando, TurmaCatequizandoPK} from "./TurmaCatequizando";

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
}