import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Responsavel} from "./responsavel";
import {Catequizando} from "../catequizandos/catequizando";

export default class ResponsaveisService extends HttpCRUDService {
    constructor() {
        super("/responsaveis");
    }

    merge<T>(value: Responsavel): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`/${value.id}`, value);
    }

    findByEmail(email: string): Observable<AppResponse<Responsavel>> {
        return this.httpClient.doGet(`?q=email=${email}`);
    }

    findCatequizandosByIdResponsavel(idResponsavel: number): Observable<AppResponse<Catequizando[]>> {
        return this.httpClient.doGet(`/${idResponsavel}/catequizandos`);
    }
}