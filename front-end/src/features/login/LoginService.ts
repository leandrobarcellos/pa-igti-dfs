import {AppResponse, HttpService} from "../../components/core/HttpCRUDService";
import {Observable} from "rxjs";

export interface Login {
    username: string,
    password: string,
    callback?: () => void
    onError?: (err: Error) => void
}

export class LoginService extends HttpService {
    constructor() {
        super("/login");
    }

    login(login: Login): Observable<AppResponse<any>> {
        return this.httpClient.post("", login);
    }

}
