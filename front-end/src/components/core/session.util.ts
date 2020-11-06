export interface User {
    username: string,
    roles: string[]
}

export class SessionUtil {

    public static LOGGED_USR: any;

    public static isAdmin(): boolean {
        return SessionUtil.hasRole('ADMIN');
    }

    public static isCatequista(): boolean {
        return SessionUtil.hasRole('CATEQUISTA');
    }

    public static isResponsavel(): boolean {
        return SessionUtil.hasRole('RESPONSAVEL');
    }

    public static getToken(): string {
        return sessionStorage.getItem("catequese:token") as string;
    }

    public static setToken(token: string) {
        return sessionStorage.setItem("catequese:token", token);
    }

    public static setUser(user: User) {
        return sessionStorage.setItem("catequese:user", JSON.stringify(user));
    }

    public static getUser(): User {
        let jsonUser = sessionStorage.getItem("catequese:user") as string;
        let usr = undefined;
        if(!jsonUser || jsonUser === 'undefined') {
            SessionUtil.logout();
        } else {
            usr = JSON.parse(jsonUser);
        }
        return usr;
    }

    public static isAuthenticated() {
        return SessionUtil.getToken() && SessionUtil.getToken().length > 0;
    }

    private static hasRole(role: string): boolean {
        const user = SessionUtil.getUser();
        let flgRole = false;
        if (user && user.roles) {
            flgRole = user.roles.includes(role);
        }
        return flgRole;
    }

    static logout() {
        localStorage.removeItem("catequese:token");
        sessionStorage.removeItem("catequese:token");
        localStorage.removeItem("catequese:user");
        sessionStorage.removeItem("catequese:user");
    }
}
