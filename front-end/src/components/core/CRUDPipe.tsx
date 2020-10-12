import {Observable, of, Subject} from "rxjs";
import {MonoTypeOperatorFunction} from "rxjs/internal/types";
import {catchError, takeUntil} from "rxjs/operators";
import {FormAction} from "./FormAction";

export interface SearchAction<X> {
    callback: (expected: X) => void
}

export interface FilteredSearchAction<T, X> extends SearchAction<X> {
    filter?: T
}

export abstract class AppPipe {
    private readonly unsubscriber$ = new Subject<any>();

    protected defaultErrorCatcher() {
        return catchError((err: any) => {
            let message = err.message;
            if (err["response"]?.data?.message)
                message = err["response"].data.message;
            console.log(message);
            return of({});
        });
    }

    protected takeUntilDestroy<U>(): MonoTypeOperatorFunction<unknown> {
        return takeUntil(this.unsubscriber$);
    }

    unsubscribe(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    protected finishPipeRegistration(toFinish: Observable<unknown>) {
        toFinish.pipe(
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }

}

export abstract class CRUDPipe<T, F> extends AppPipe {

    private readonly _save = new Subject<FormAction<T>>();
    private readonly _update = new Subject<FormAction<T>>();
    private readonly _remove = new Subject<FormAction<T>>();
    private _pipeFindAll = new Subject<SearchAction<T[]>>();
    private _pipeFindById = new Subject<FilteredSearchAction<number, T>>();
    private _pipeFindByFilter = new Subject<FilteredSearchAction<F, T[]>>();

    constructor() {
        super();
        this.initSavePipe();
        this.initUpdatePipe();
        this.initDeletePipe();
    }

    get save(): Subject<FormAction<T>> {
        return this._save;
    }

    get update(): Subject<FormAction<T>> {
        return this._update;
    }

    get remove(): Subject<FormAction<T>> {
        return this._remove;
    }

    get pipeFindAll(): Subject<SearchAction<T[]>> {
        return this._pipeFindAll;
    }

    get pipeFindById(): Subject<FilteredSearchAction<number, T>> {
        return this._pipeFindById;
    }

    get pipeFindByFilter(): Subject<FilteredSearchAction<F, T[]>> {
        return this._pipeFindByFilter;
    }

    protected abstract registerSavePipe(save: Observable<FormAction<T>>): Observable<unknown>;

    protected abstract registerUpdatePipe(update: Observable<FormAction<T>>): Observable<unknown>;

    protected abstract registerRemovePipe(remove: Observable<FormAction<T>>): Observable<unknown>;

    protected registerFindAllPipe(remove: Observable<SearchAction<T[]>>): Observable<unknown> {
        return this._pipeFindAll.pipe();
    }

    protected registerFindByFilterPipe(remove: Observable<FilteredSearchAction<F, T[]>>): Observable<unknown> {
        return this._pipeFindByFilter.pipe();
    }

    protected registerFindByIdPipe(remove: Observable<FormAction<T>>): Observable<unknown> {
        return this._pipeFindById.pipe();
    }

    private initSavePipe() {
        this.finishPipeRegistration(this.registerSavePipe(this._save));
    }

    private initUpdatePipe() {
        this.finishPipeRegistration(this.registerUpdatePipe(this._update));
    }

    private initDeletePipe() {
        this.finishPipeRegistration(this.registerRemovePipe(this._remove));
    }

    callActionCompleted(action: FormAction<T>): void {
        if (action && action.actionCompleted) {
            action.actionCompleted();
        }
    }
}