import {HttpService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";

export class UsuariosService extends HttpService {

    constructor() {
        super('/usuarios');
    }

}
