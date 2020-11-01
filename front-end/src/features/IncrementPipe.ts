import {of, Subject} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {Catequista} from "../../../back-end/features/catequista/Catequista";
import {CatequistaService} from "../../../back-end/features/catequista/CatequistaService";


export class IncrementPipe {
    private incremented = 0;
    private _incrementer = new Subject<number>();
    private _testService = new Subject<(cs: Catequista[]) => void>();
    private cateqService = new CatequistaService();

    constructor() {
        this._incrementer.pipe(
            tap((n: number) => this.doIncrement(n)),
            tap(() => alert(this.incremented)),
            tap(() => localStorage.setItem("incremented", this.incremented + ""))
        ).subscribe();

        this._testService.pipe(
            switchMap(() => this.cateqService.findAll()),
            catchError((e: any) => {
                console.log(e);
                return of({});
            })
        ).subscribe();
    }

    private doIncrement(n: number) {
        return this.incremented = this.incremented + n;
    }

    get catequista(): Subject<(cs: Catequista[]) => void> {
        return this._testService;
    }

    get incrementer(): Subject<number> {
        return this._incrementer;
    }
}