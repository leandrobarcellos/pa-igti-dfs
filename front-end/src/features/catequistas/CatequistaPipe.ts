import {CRUDPipe, FilteredSearchAction, SearchAction} from "../../components/core/CRUDPipe";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";
import {Observable, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {FormAction} from "./FormCatequista";
import {AppResponse} from "../../components/core/HttpService";
import CatequistasService from "./CatequistasService";

export interface FiltroCatequista {

}

export class CatequistaPipe extends CRUDPipe<Catequista> {

    private readonly catequistaService = new CatequistasService();
    private pipeFindAll = new Subject<SearchAction<Catequista[]>>();
    private pipeFindById = new Subject<FilteredSearchAction<number, Catequista>>();

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
        );
    }

    protected registerDeletePipe(del: Observable<FormAction<Catequista>>): Observable<unknown> {
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

    private initPipes() {
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
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }
}