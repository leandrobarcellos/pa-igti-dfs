import {AppPipe, SearchAction} from "../../components/core/CRUDPipe";
import {EtapasService} from "./EtapasService";
import {Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppResponse} from "../../components/core/HttpCRUDService";
import {Etapa} from "./etapa";

export class EtapaPipe extends AppPipe {

    private readonly _findAll = new Subject<SearchAction<Etapa[]>>();
    private readonly service = new EtapasService();

    constructor() {
        super();
        this.initPipes();
    }

    get findAll(): Subject<SearchAction<Etapa[]>> {
        return this._findAll;
    }

    protected initPipes(): void {
        this.initPipeFindAll();
    }

    private initPipeFindAll() {
        this._findAll.pipe(
            switchMap((action: SearchAction<Etapa[]>) =>
                this.service.findAll().pipe(
                    tap((res: AppResponse<Etapa[]>) => console.log("this._findAll.pipe", res)),
                    tap((res: AppResponse<Etapa[]>) => action.callback(res.data.object))
                )
            ),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }
}
