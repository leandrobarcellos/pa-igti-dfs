import {CRUDPipe, FilteredSearchAction, SearchAction} from "../../components/core/CRUDPipe";
import {Observable, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppResponse} from "../../components/core/HttpCRUDService";
import CatequizandosService from "./CatequizandosService";
import {FormAction} from "../../components/core/FormAction";
import ResponsaveisService from "../responsaveis/ResponsaveisService";
import {Catequizando} from "./catequizando";

export interface FiltroCatequizando {
    idResponsavel?: number,
}

export class CatequizandoPipe extends CRUDPipe<Catequizando, FiltroCatequizando> {

    private readonly catequizandosService = new CatequizandosService();
    private readonly responsaveisService = new ResponsaveisService();
    private readonly _catequizandosByIdResponsavel = new Subject<FilteredSearchAction<number, Catequizando[]>>();

    constructor() {
        super();
        this.initPipes();
    }

    get catequizandosByIdResponsavel(): Subject<FilteredSearchAction<number, Catequizando[]>> {
        return this._catequizandosByIdResponsavel;
    }

    protected registerUpdatePipe(update: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return update.pipe(
            switchMap((next: FormAction<Catequizando>) =>
                this.catequizandosService.merge<Catequizando>(next.formData).pipe(
                    tap(() => this.callActionCompleted(next))
                )),
            tap((c: AppResponse<Catequizando>) => console.log(c)),
        );
    }

    protected registerRemovePipe(del: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return del.pipe(
            switchMap(
                (next: FormAction<Catequizando>) =>
                    this.catequizandosService.remove<Catequizando>(next.formData.id).pipe(
                        tap(() => this.callActionCompleted(next))
                    )),
            tap((res: AppResponse<Catequizando>) => console.log(res))
        );
    }

    protected registerSavePipe(save: Observable<FormAction<Catequizando>>): Observable<unknown> {
        return save.pipe(
            switchMap((next: FormAction<Catequizando>) =>
                this.catequizandosService.persist<Catequizando>(next.formData).pipe(
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

    findByFilter(filter: FilteredSearchAction<FiltroCatequizando, Catequizando[]>): void {
        this.pipeFindByFilter.next(filter)
    }

    protected initPipes() {
        this.pipeFindAll.pipe(
            switchMap((next: SearchAction<Catequizando[]>) =>
                this.catequizandosService.findAll<Catequizando[]>().pipe(
                    tap((res) => next.callback(res.data as Catequizando[]))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
        this.pipeFindById.pipe(
            switchMap((next) =>
                this.catequizandosService.find<Catequizando>(next.filter).pipe(
                    tap(res => next.callback(res.data.object as Catequizando))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
        this._catequizandosByIdResponsavel.pipe(
            switchMap(next => this.responsaveisService.findCatequizandosByIdResponsavel(next.filter as number)
                .pipe(
                    tap(res => next.callback(res.data as Catequizando[]))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }
}