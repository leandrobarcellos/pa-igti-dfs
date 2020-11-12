import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequizando} from "./catequizando";
import CatequizandosDispatcher from "./catequizandos.dispatcher";
import {paths, UsuariosDispatcher} from "../../util/domain/usuarios.dispatcher";
import {Responsavel} from "../responsaveis/responsavel";
import {EtapasDispatcher} from "../../util/domain/etapas.dispatcher";

export default class CatequizandosService extends HttpCRUDService {
    private readonly dispatcher = new CatequizandosDispatcher();
    private readonly usrDispatcher = new UsuariosDispatcher();
    private readonly etapaDispatcher = new EtapasDispatcher();

    constructor() {
        super("/catequizandos");
    }

    merge<T>(value: Catequizando): Observable<AppResponse<T>> {
        return this.dispatcher.merge(value);
    }

    findAllByIdUsuario(idUsuario: number): Observable<AppResponse<Catequizando[]>> {
        return this.usrDispatcher.findCatequizandosByIdUsuario(idUsuario);
    }

    findResponsaveisByIdUsuario(idUsuario: number): Observable<AppResponse<Responsavel[]>> {
        return this.usrDispatcher.get(paths.responsaveis(idUsuario));
    }

    findAllByIdEtapa(idEtapa: any): Observable<AppResponse<Responsavel[]>> {
        return this.etapaDispatcher.catequizandosByIdEtapa(idEtapa);
    }
}
