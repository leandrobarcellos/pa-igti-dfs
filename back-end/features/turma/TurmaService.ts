import {TurmaRepository} from "./TurmaRepository";
import {Turma} from "./Turma";

export class TurmaService {

    private repo: TurmaRepository;

    constructor() {
        this.repo = new TurmaRepository();
    }

    public incluir(turma: Turma): void {
        this.repo.save(turma);
    }

    public alterar(turma: Turma): void {
        this.repo.update(turma);
    }

    public excluir(id: number): void {
        this.repo.delete(id);
    }

    public find(id?: number): Turma | Turma[] {
        if (id) {
            return this.repo.findById(id);
        }
        return this.repo.findAll();
    }

}