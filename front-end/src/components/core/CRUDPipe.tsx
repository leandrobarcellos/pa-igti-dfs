import {Observable, of, Subject} from "rxjs";
import {MonoTypeOperatorFunction} from "rxjs/internal/types";
import {catchError, takeUntil} from "rxjs/operators";
import {FormAction} from "../../features/catequistas/FormCatequista";

export interface SearchAction<X> {
    callback: (expected: X) => void
}

export interface FilteredSearchAction<T, X> extends SearchAction<X> {
    filter?: T
}

export abstract class CRUDPipe<T> {

    private readonly unsubscriber$ = new Subject<any>();
    private readonly _save = new Subject<FormAction<T>>();
    private readonly _update = new Subject<FormAction<T>>();
    private readonly _delete = new Subject<FormAction<T>>();

    constructor() {
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

    get delete(): Subject<FormAction<T>> {
        return this._delete;
    }

    protected abstract registerSavePipe(save: Observable<FormAction<T>>): Observable<unknown>;

    protected abstract registerUpdatePipe(update: Observable<FormAction<T>>): Observable<unknown>;

    protected abstract registerDeletePipe(del: Observable<FormAction<T>>): Observable<unknown>;

    private initSavePipe() {
        this.finishPipeRegistration(this.registerSavePipe(this._save));
    }

    private initUpdatePipe() {
        this.finishPipeRegistration(this.registerUpdatePipe(this._update));
    }

    private initDeletePipe() {
        this.finishPipeRegistration(this.registerDeletePipe(this._delete));
    }

    private finishPipeRegistration(toFinish: Observable<unknown>) {
        toFinish.pipe(
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }

    protected defaultErrorCatcher() {
        return catchError((err: Error) => {
            console.log(err.message);
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

    callActionCompleted(action: FormAction<T>): void {
        if (action && action.actionCompleted) {
            action.actionCompleted();
        }
    }
}