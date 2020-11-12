import {AppResponse} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "../../features/catequistas/catequista";
import {Catequizando} from "../../features/catequizandos/catequizando";
import HttpClient from "../../components/core/HttpClient";

export class EtapasDispatcher extends HttpClient {

    constructor() {
        super('/etapas');
    }

    public catequistasByIdEtapa(idEtapa: number): Observable<AppResponse<Catequista[]>> {
        return this.get(`/${idEtapa}/catequistas`);
    }

    public catequizandosByIdEtapa(idEtapa: number): Observable<AppResponse<Catequizando[]>> {
        return this.get(`/${idEtapa}/catequizandos`);
    }

}
