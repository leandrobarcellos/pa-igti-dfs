import {CRUDPipe} from "../../components/core/CRUDPipe";
import {Observable} from "rxjs";
import {FormAction} from "../../components/core/FormAction";
import {TurmasService} from "./TurmasService";
import {switchMap, tap} from "rxjs/operators";
import {Turma} from "./turma";


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

    protected initPipes() {
    }
}
