import {HttpCRUDService} from "../../components/core/HttpCRUDService";
import {NovaSubscricao} from "./NovaSubscricao";
import {Observable} from "rxjs";

export class SubscricaoService extends HttpCRUDService {

    constructor() {
        super("");
    }

    novoRegistro(dados: NovaSubscricao): Observable<unknown> {
        return this.httpClient.post('/signup', dados);
    }

}
