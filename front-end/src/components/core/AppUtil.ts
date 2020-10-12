export class AppUtil {
    static loggedIn(): boolean {
        let item = localStorage.getItem("catequese:token");
        if (item)
            return true;
        return false;
    }
}