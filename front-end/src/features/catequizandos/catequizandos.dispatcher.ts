import HttpClient from "../../components/core/HttpClient";
import {Catequizando} from "./catequizando";
import {Observable} from "rxjs";
import {AppResponse} from "../../components/core/HttpCRUDService";

export default class CatequizandosDispatcher extends HttpClient {

    constructor() {
        super("/catequizandos");
    }

    merge<T>(value: Catequizando): Observable<AppResponse<T>> {
        return this.put(`/${value.id}`, value);
    }

}
