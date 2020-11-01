import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequizando} from "./catequizando";

export default class CatequizandosService extends HttpCRUDService {
    constructor() {
        super("/catequizando");
    }

    merge<T>(value: Catequizando): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`/${value.id}`, value);
    }

}