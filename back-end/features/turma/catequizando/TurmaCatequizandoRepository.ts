import {CRUDRepository} from "../../../core/CRUDRepository";
import {TurmaCatequizando, TurmaCatequizandoPK} from "./TurmaCatequizando";

export class TurmaCatequizandoRepository extends CRUDRepository<TurmaCatequizandoPK, TurmaCatequizando> {

    constructor() {
        super("turmasCatequizandos");
    }

    findByIdTurma(idTurma: number): TurmaCatequizando[] {
        return this.find(o => {
            if (o.id)
                return o.id.idTurma === idTurma;
            return false;
        });
    }

    findIdsCatequizandosByIdTurma(idTurma: number): number[] {
        let result: number[] = [];
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
}