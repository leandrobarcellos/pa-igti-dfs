import {CRUDPipe, FilteredSearchAction, SearchAction} from "../../components/core/CRUDPipe";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppResponse} from "../../components/core/HttpCRUDService";
import CatequistasService from "./CatequistasService";
import {FormAction} from "../../components/core/FormAction";
import {EtapasService} from "../../util/domain/EtapasService";

export interface FiltroCatequista {

}

export class CatequistaPipe extends CRUDPipe<Catequista, FiltroCatequista> {

    private readonly catequistaService = new CatequistasService();
    private readonly etapasService = new EtapasService();
    private readonly _catequistasByEtapas = new Subject<FilteredSearchAction<number, Catequista[]>>();

    constructor() {
        super();
        this.initPipes();
    }

    protected registerUpdatePipe(update: Observable<FormAction<Catequista>>): Observable<unknown> {
        return update.pipe(
            switchMap((next: FormAction<Catequista>) =>
                this.catequistaService.merge<Catequista>(next.formData).pipe(
                    tap(() => this.callActionCompleted(next))
                )),
            tap((c: AppResponse<Catequista>) => console.log(c)),
            this.done()
        );
    }

    protected registerRemovePipe(del: Observable<FormAction<Catequista>>): Observable<unknown> {
        return del.pipe(
            switchMap(
                (next: FormAction<Catequista>) =>
                    this.catequistaService.remove<Catequista>(next.formData.id).pipe(
                        tap(() => this.callActionCompleted(next))
                    )),
            tap((res: AppResponse<Catequista>) => console.log(res))
        );
    }

    protected registerSavePipe(save: Observable<FormAction<Catequista>>): Observable<unknown> {
        return save.pipe(
            switchMap((next: FormAction<Catequista>) =>
                this.catequistaService.persist<Catequista>(next.formData).pipe(
                    tap((nextAppRes: AppResponse<Catequista>) => console.log(nextAppRes)),
                    tap(() => this.callActionCompleted(next))
                ))
        );
    }

    get findAll(): Subject<SearchAction<Catequista[]>> {
        return this.pipeFindAll;
    }

    get findById(): Subject<FilteredSearchAction<number, Catequista>> {
        return this.pipeFindById;
    }

    findByFilter(filter: FiltroCatequista, consumer: (value: Catequista[]) => void): void {
        throw new Error("Method not implemented.");
    }

    protected initPipes() {
        this.pipeFindAll.pipe(
            switchMap((next: SearchAction<Catequista[]>) =>
                this.catequistaService.findAll<Catequista[]>().pipe(
                    tap((res) => next.callback(res.data.object as Catequista[]))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
        this.pipeFindById.pipe(
            switchMap((next) =>
                this.catequistaService.find<Catequista>(next.filter).pipe(
                    tap(res => next.callback(res.data.object as Catequista))
                )
            )
        ).subscribe();
        this._catequistasByEtapas.pipe(
            switchMap(n => {
                if (n.filter)
                    return this.etapasService.findCatequistasByIdEtapa(n.filter).pipe(
                        tap((res) => n.callback(res.data.object as Catequista[]))
                    );
                return of({});
            }),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }

    get catequistasByIdEtapa(): Subject<FilteredSearchAction<number, Catequista[]>> {
               return this._catequistasByEtapas;
    }

}