import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Responsavel} from "./responsavel";
import {Catequizando} from "../catequizandos/catequizando";
import {paths, UsuariosDispatcher} from "../../util/domain/usuarios.dispatcher";

export default class ResponsaveisService extends HttpCRUDService {
    private readonly usuariosDispatcher = new UsuariosDispatcher();

    constructor() {
        super("/responsaveis");
    }

    merge<T>(value: Responsavel): Observable<AppResponse<T>> {
        return this.httpClient.put(`/${value.id}`, value);
    }

    findByEmail(email: string): Observable<AppResponse<Responsavel>> {
        return this.httpClient.get(`?q=email=${email}`);
    }

    findCatequizandosByIdResponsavel(idResponsavel: number): Observable<AppResponse<Catequizando[]>> {
        return this.httpClient.get(`/${idResponsavel}/catequizandos`);
    }

    findResponsaveisByIdUsuario(idUsuario: number): Observable<AppResponse<Responsavel[]>> {
        if (!idUsuario) {
            throw new Error("findResponsaveisByIdUsuario: É necessário um identificador para realizar a consulta.");
        }
        return this.usuariosDispatcher.get(paths.responsaveis(idUsuario));
    }
}
