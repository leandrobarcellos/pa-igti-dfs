import {CRUDPipe, FilteredSearchAction, SearchAction} from "../../components/core/CRUDPipe";
import {Observable, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppResponse} from "../../components/core/HttpCRUDService";
import {Catequizando} from "../../../../back-end/features/catequizando/Catequizando";
import CatequizandosService from "./CatequizandosService";
import {FormAction} from "../../components/core/FormAction";

export interface FiltroCatequizando {

}

export class CatequizandoPipe extends CRUDPipe<Catequizando, FiltroCatequizando> {

    private readonly catequizandoService = new CatequizandosService();

    constructor() {
        super();
        this.initPipes();
    }

    protected registerUpdatePipe(update: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return update.pipe(
            switchMap((next: FormAction<Catequizando>) =>
                this.catequizandoService.merge<Catequizando>(next.formData).pipe(
                    tap(() => this.callActionCompleted(next))
                )),
            tap((c: AppResponse<Catequizando>) => console.log(c)),
        );
    }

    protected registerRemovePipe(del: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return del.pipe(
            switchMap(
                (next: FormAction<Catequizando>) =>
                    this.catequizandoService.remove<Catequizando>(next.formData.id).pipe(
                        tap(() => this.callActionCompleted(next))
                    )),
            tap((res: AppResponse<Catequizando>) => console.log(res))
        );
    }

    protected registerSavePipe(save: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return save.pipe(
            switchMap((next: FormAction<Catequizando>) =>
                this.catequizandoService.persist<Catequizando>(next.formData).pipe(
                    tap((nextAppRes: AppResponse<Catequizando>) => console.log(nextAppRes)),
                    tap(() => this.callActionCompleted(next))
                ))
        );
    }

    get findAll(): Subject<SearchAction<Catequizando[]>> {
        return this.pipeFindAll;
    }

    get findById(): Subject<FilteredSearchAction<number, Catequizando>> {
        return this.pipeFindById;
    }

    findByFilter(filter: FiltroCatequizando, consumer: (value: Catequizando[]) => void): void {
        throw new Error("Method not implemented.");
    }

    private initPipes() {
        this.pipeFindAll.pipe(
            switchMap((next: SearchAction<Catequizando[]>) =>
                this.catequizandoService.findAll<Catequizando[]>().pipe(
                    tap((res) => next.callback(res.data.object as Catequizando[]))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
        this.pipeFindById.pipe(
            switchMap((next) =>
                this.catequizandoService.find<Catequizando>(next.filter).pipe(
                    tap(res => {
                        if (res.data.object)
                            next.callback(res.data.object)
                    })
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }
}