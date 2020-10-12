import {ResponsavelRepository} from "./ResponsavelRepository";
import {Responsavel} from "./Responsavel";

export class ResponsavelService {
    private readonly repository: ResponsavelRepository;

    constructor() {
        this.repository = new ResponsavelRepository();
    }

    public salvar(responsavel: Responsavel): void {
        this.repository.save(responsavel);
    }

    public atualizar(responsavel?: Responsavel): void {
        if (responsavel)
            this.repository.update(responsavel);
    }

    public consultarPorId(id: number): Responsavel {
        return this.repository.findById(id);
    }


    findByEmail(email: any): Responsavel {
        return this.repository.findByEmail(email);
    }
}