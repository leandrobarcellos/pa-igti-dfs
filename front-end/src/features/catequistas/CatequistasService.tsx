import {AppResponse, HttpCRUDService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "./catequista";
import {CatequistasDispatcher} from "./catequistas.dispatcher";

export default class CatequistasService extends HttpCRUDService {
    private readonly dispatcher = new CatequistasDispatcher();
    constructor() {
        super("/catequistas", );
    }

    merge<T>(value: Catequista): Observable<AppResponse<T>> {
        return this.dispatcher.merge(value);
    }

}
