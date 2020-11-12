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

    findByIdsResponsaveis(idsResponsaveis: number[]) {
        console.log("findByIdsResponsaveis", idsResponsaveis);
        return this.filter(c => idsResponsaveis.includes(c.idMae) ||
            idsResponsaveis.includes(c.idPai));
    }

    findCatequizandosByIdResponsavel(idResponsavel: number): Catequizando[] {
        return this.filter(c => c.idMae == idResponsavel ||
            c.idPai == idResponsavel);
    }
}

