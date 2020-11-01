import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "./catequista";

export default class CatequistasService extends HttpCRUDService {
    constructor() {
        super("/catequista");
    }

    merge<T>(value: Catequista): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`/${value.id}`, value);
    }

}