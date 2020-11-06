import {Catequizando} from "./catequizando";
import {CrudRepository} from "../../core/infra/crud.repository";

export class CatequizandoRepository extends CrudRepository<number, Catequizando> {

    constructor() {
        super("catequizandos");
    }
    
    public findByIdsCatequizandos(idsCatequizandos: number[]) {
        return this.filter(o => {
            if (o.id)
                return idsCatequizandos.includes(o.id);
            return false;
        });
    }
}

