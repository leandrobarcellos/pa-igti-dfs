import {Login, LoginService} from "./LoginService";
import {of, Subject} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {AppPipe} from "../../components/core/CRUDPipe";
import {SessionUtil} from "../../components/core/session.util";

export class LoginPipe extends AppPipe {
    private readonly loginService = new LoginService();

    private _login = new Subject<Login>();

    constructor() {
        super();
        this.initPipes();
    }

    get login(): Subject<Login> {
        return this._login;
    }

    protected initPipes(): void {
        this._login.pipe(
            switchMap(loginInfo => this.loginService.login(loginInfo).pipe(
                tap((next) => console.log(next.data)),
                tap((next) => SessionUtil.setToken(next.data["object"]["access_token"])),
                tap((next) => SessionUtil.setUser(next.data["object"]["user"])),
                tap(() => {
                    if (loginInfo.callback)
                        loginInfo.callback();
                }),
                catchError(err => {
                    if (loginInfo.onError)
                        loginInfo.onError(err);
                    return of({});
                })
            )),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }

}
