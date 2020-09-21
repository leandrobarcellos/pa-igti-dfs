import {EtapaRepository} from "./EtapaRepository";
import {Etapa} from "./Etapa";

export class EtapaService {

    private readonly repository: EtapaRepository;

    constructor() {
        this.repository = new EtapaRepository();
    }

    public findAll(): Etapa[] {
        return this.repository.findAll();
    }

    public findById(id: number): Etapa {
        return this.repository.findById(id);
    }
}