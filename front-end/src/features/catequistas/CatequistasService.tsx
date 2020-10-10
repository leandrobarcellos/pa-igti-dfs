import {AppResponse, HttpService} from "../../components/core/HttpService";
import {Observable} from "rxjs";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";

export default class CatequistasService extends HttpService {
    constructor() {
        super("/catequistas");
    }

    merge<T>(value: Catequista): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`${value.id}`, value);
    }

}