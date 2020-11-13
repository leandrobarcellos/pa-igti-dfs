import {EtapaRepository} from "./etapa.repository";
import {Etapa} from "./etapa";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EtapaService {

    private readonly repository: EtapaRepository;

    constructor() {
        this.repository = new EtapaRepository();
    }

    public findAll(): Etapa[] {
        console.log("public findAll(): Etapa[]");
        return this.repository.findAll();
    }

    public findById(id: number): Etapa {
        return this.repository.findById(id);
    }
}
