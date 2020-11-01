import {CRUDPipe, FilteredSearchAction} from "../../components/core/CRUDPipe";
import {Turma} from "../../../../back-end/features/turma/Turma";
import {Observable, Subject} from "rxjs";
import {FormAction} from "../../components/core/FormAction";
import {TurmasService} from "./TurmasService";
import {switchMap, tap} from "rxjs/operators";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";


interface FiltroTurma {

}

export class TurmaPipe extends CRUDPipe<Turma, FiltroTurma> {

    turmasService = new TurmasService();

    constructor() {
        super();
    }

    protected registerRemovePipe(del: Observable<FormAction<Turma>>): Observable<unknown> {
        return del.pipe(
            switchMap((formAction: FormAction<Turma>) =>
                this.turmasService.remove(formAction.formData.id).pipe(
                    tap(res => alert(res.data.message))
                )),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy(),
        );
    }

    protected registerSavePipe(save: Observable<FormAction<Turma>>): Observable<unknown> {
        return save.pipe();
    }

    protected registerUpdatePipe(update: Observable<FormAction<Turma>>): Observable<unknown> {
        return update.pipe();
    }

    protected initPipes(): void {
        throw new Error("Method not implemented.");
    }
}