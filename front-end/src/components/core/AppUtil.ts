
export class AppUtil {
    static loggedIn(): boolean {
        // return true;
        let item = localStorage.getItem("catequese:token");
        if (item)
            return true;
        item = sessionStorage.getItem("catequese:token");
        if(item)
            return true;
        return false;
    }


}
