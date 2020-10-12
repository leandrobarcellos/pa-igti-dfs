import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "../../../../back-end/features/catequista/Catequista";

export default class CatequistasService extends HttpCRUDService {
    constructor() {
        super("/catequistas");
    }

    merge<T>(value: Catequista): Observable<AppResponse<T>> {
        return this.httpClient.doPut(`${value.id}`, value);
    }

}