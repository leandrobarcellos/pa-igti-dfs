import {Login, LoginService} from "./LoginService";
import {Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {AppPipe} from "../../components/core/CRUDPipe";

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
                tap((next) => sessionStorage.setItem("catequese:token", btoa(JSON.stringify(next.data.object)))),
                tap(() => {
                    if (loginInfo.callback)
                        loginInfo.callback();
                })
            )),
            this.defaultErrorCatcher(),
            this.takeUntilDestroy()
        ).subscribe();
    }


}