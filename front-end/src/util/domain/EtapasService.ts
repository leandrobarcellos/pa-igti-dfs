import {AppResponse, HttpService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "../../features/catequistas/catequista";

export class EtapasService extends HttpService {

    constructor() {
        super("/etapas");
    }

    public findCatequistasByIdEtapa(idEtapa: number): Observable<AppResponse<Catequista[]>> {
        return this.httpClient.doGet(`/${idEtapa}/catequistas`);
    }

}