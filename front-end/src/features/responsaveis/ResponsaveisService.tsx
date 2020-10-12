import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Responsavel} from "../../../../back-end/features/responsavel/Responsavel";

export default class CatequizandosService extends HttpCRUDService {
    constructor() {
        super("/responsaveis");
    }

    merge<T>(value: Responsavel): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`${value.id}`, value);
    }

    findByEmail(email: string) {
        return this.httpClient.doGet(`?q=email=${email}`);
    }
}