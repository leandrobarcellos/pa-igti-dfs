import {TurmaCatequizando, TurmaCatequizandoPK} from "./turma-catequizando";
import {CrudRepository} from "../../core/infra/crud.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TurmaCatequizandoRepository extends CrudRepository<TurmaCatequizandoPK, TurmaCatequizando> {

    constructor() {
        super("turmasCatequizandos");
    }

    findByIdTurma(idTurma: number): TurmaCatequizando[] {
        return this.filter(o => {
            if (o.id)
                return o.id.idTurma === idTurma;
            return false;
        });
    }

    findIdsCatequizandosByIdTurma(idTurma: number): number[] {
        const result: number[] = [];
        this.findByIdTurma(idTurma).map(o => {
            if (o.id)
                return o.id.idCatequizando;
            return null;
        }).forEach((id: number | null) => {
            if (null != id && !result.includes(id)) {
                result.push(id);
            }
        });
        return result;
    }

    findByIdCatequizando(idCatequizando: number): TurmaCatequizando[] {
        return this.filter(t => t.id.idCatequizando == idCatequizando);
    }
}
