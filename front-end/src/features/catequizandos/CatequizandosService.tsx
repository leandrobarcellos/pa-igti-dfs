import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Catequizando} from "../../../../back-end/features/catequizando/Catequizando";
import {Observable} from "rxjs";

export default class CatequizandosService extends HttpCRUDService {
    constructor() {
        super("/catequizandos");
    }

    merge<T>(value: Catequizando): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`/${value.id}`, value);
    }

}