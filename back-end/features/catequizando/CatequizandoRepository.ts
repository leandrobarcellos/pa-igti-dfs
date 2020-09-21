import {CRUDRepository} from "../../core/CRUDRepository";
import {Catequizando} from "./Catequizando";

export class CatequizandoRepository extends CRUDRepository<number, Catequizando> {

    constructor() {
        super("catequizandos");
    }

    protected configurarNovoIdSequencial(entity: Catequizando, newId: number) {
        entity.id = newId;
    }

    public findByIdsCatequizandos(idsCatequizandos: number[]) {
        return this.find(o => {
            if (o.id)
                return idsCatequizandos.includes(o.id);
            return false;
        });
    }
}

