import {CRUDPipe, FilteredSearchAction, SearchAction} from "../../components/core/CRUDPipe";
import {Observable, of, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppResponse} from "../../components/core/HttpCRUDService";
import {FormAction} from "../../components/core/FormAction";
import ResponsaveisService from "./ResponsaveisService";
import {Responsavel} from "./responsavel";
import {UsuariosService} from "../../util/domain/UsuariosService";

export interface FiltroResponsavel {
    idUsuario?: number;
    email?: string;
}

export class ResponsavelPipe extends CRUDPipe<Responsavel, FiltroResponsavel> {

    private readonly responsavelService = new ResponsaveisService();
    private readonly usuarioService = new UsuariosService();
    readonly findByEmail = new Subject<FilteredSearchAction<string, any>>();
    readonly findAllByIdUsuario = new Subject<FilteredSearchAction<FiltroResponsavel, any>>();

    constructor() {
        super();
        this.initPipes();
    }

    protected registerUpdatePipe(update: Observable<FormAction<Responsavel>>): Observable<unknown> {
        return update.pipe(
            switchMap((next: FormAction<Responsavel>) =>
                this.responsavelService.merge<Responsavel>(next.formData).pipe(
                    tap(() => this.callActionCompleted(next))
                )),
            tap((c: AppResponse<Responsavel>) => console.log(c)),
        );
    }

    protected registerRemovePipe(del: Observable<FormAction<Responsavel>>): Observable<unknown> {
        return del.pipe(
            switchMap(
                (next: FormAction<Responsavel>) =>
                    this.responsavelService.remove<Responsavel>(next.formData.id).pipe(
                        tap(() => this.callActionCompleted(next))
                    )),
            tap((res: AppResponse<Responsavel>) => console.log(res))
        );
    }

    protected registerSavePipe(save: Observable<FormAction<Responsavel>>): Observable<unknown> {
        return save.pipe(
            switchMap((next: FormAction<Responsavel>) =>
                this.responsavelService.persist<Responsavel>(next.formData).pipe(
                    tap((nextAppRes: AppResponse<Responsavel>) => console.log(nextAppRes)),
                    tap(() => this.callActionCompleted(next))
                ))
        );
    }

    get findAll(): Subject<SearchAction<Responsavel[]>> {
        return this.pipeFindAll;
    }

    get findById(): Subject<FilteredSearchAction<number, Responsavel>> {
        return this.pipeFindById;
    }

    findByFilter(filter: FiltroResponsavel, consumer: (value: Responsavel[]) => void): void {

    }

    protected initPipes() {
        this.findAllByIdUsuario.pipe(
            switchMap(action => this.responsavelService
                .findResponsaveisByIdUsuario(action.filter.idUsuario as number).pipe(
                    tap(res => action.callback(res.data.object))
                ))
        ).subscribe();
        this.findByEmail.pipe(
            switchMap(search => {
                if (search.filter)
                    return this.responsavelService.findByEmail(search.filter).pipe(
                        tap(res => search.callback(res))
                    );
                return of({});
            })
        ).subscribe();
        this.pipeFindAll.pipe(
            switchMap((next: SearchAction<Responsavel[]>) =>
                this.responsavelService.findAll<Responsavel[]>().pipe(
                    tap((res) => next.callback(res.data.object))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
        this.pipeFindById.pipe(
            switchMap((next) =>
                this.responsavelService.find<Responsavel>(next.filter).pipe(
                    tap(res => next.callback(res.data.object as Responsavel))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }
}
