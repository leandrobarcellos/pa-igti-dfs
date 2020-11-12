import {AppResponse, HttpService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import {Catequista} from "../../features/catequistas/catequista";
import {Etapa} from "./etapa";
import Catequizandos from "../../features/catequizandos/Catequizandos";
import {Catequizando} from "../../features/catequizandos/catequizando";

export class EtapasService extends HttpService {

    constructor() {
        super("/etapas");
    }

    public findCatequistasByIdEtapa(idEtapa: number): Observable<AppResponse<Catequista[]>> {
        return this.httpClient.get(`/${idEtapa}/catequistas`);
    }

    public findCatequizandosByIdEtapa(idEtapa: number): Observable<AppResponse<Catequizando[]>> {
        return this.httpClient.get(`/${idEtapa}/catequizandos`);
    }

    public findAll(): Observable<AppResponse<Etapa[]>> {
        console.log("public findAll()");
        return this.httpClient.get();
    }

}
