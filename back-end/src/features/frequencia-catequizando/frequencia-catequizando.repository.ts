import {CrudRepository} from "../../core/infra/crud.repository";
import {FrequenciaCatequizando, FrequenciaCatequizandoPK} from "./frequencia-catequizando";

export class FrequenciaCatequizandoRepository extends CrudRepository<FrequenciaCatequizandoPK, FrequenciaCatequizando> {

    constructor() {
        super('frequencias-catequizandos');
    }
}
