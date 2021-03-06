import {Etapa} from "./etapa";
import {Repository} from "../../../core/infra/repository";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class EtapaRepository extends Repository<number, Etapa> {

    constructor() {
        super("etapas");
    }

    public findById(id: number): Etapa {
        const found = super.filter(o => id === o.id);
        if (found && found.length > 0) {
            return found[0];
        }
        throw new NotFoundException("Não encontrado.");
    }
}
