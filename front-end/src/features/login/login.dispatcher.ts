import {AppResponse} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";
import HttpClient, {_} from "../../components/core/HttpClient";

export interface Login {
    username: string,
    password: string,
    callback?: () => void
    onError?: (err: Error) => void
}

export class LoginDispatcher extends HttpClient {
    constructor() {
        super("/login");
    }

    login(login: Login): Observable<AppResponse<any>> {
        return this.post(_, login);
    }

}
