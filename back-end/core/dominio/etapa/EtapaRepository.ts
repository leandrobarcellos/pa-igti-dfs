import {Repository} from "../../Repository";
import {APIException} from "../../exception/APIException";
import {Etapa} from "./Etapa";

export class EtapaRepository extends Repository<number, Etapa> {

    constructor() {
        super("etapas");
    }

    public findById(id: number): Etapa {
        let found = super.find(o => id === o.id);
        if (found && found.length > 0) {
            return found[0];
        }
        throw new APIException("Não encontrado.", 404);
    }
}