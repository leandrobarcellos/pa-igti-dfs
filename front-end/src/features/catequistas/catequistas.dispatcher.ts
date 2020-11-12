import HttpClient from "../../components/core/HttpClient";
import {Catequista} from "./catequista";
import {Observable} from "rxjs";
import {AppResponse} from "../../components/core/HttpCRUDService";

const paths = {
    turmas: (idCatequista: number) => `/${idCatequista}/turmas`,

}
export class CatequistasDispatcher extends HttpClient {

    constructor() {
        super('/catequistas');
    }

    merge<T>(value: Catequista): Observable<AppResponse<T>> {
        return this.put(`/${value.id}`, value);
    }

}
