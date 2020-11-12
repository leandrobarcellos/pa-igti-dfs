export class AppUtil {
    static loggedIn(): boolean {
        // return true;
        let item = localStorage.getItem("catequese:token");
        if (item)
            return true;
        item = sessionStorage.getItem("catequese:token");
        if (item)
            return true;
        return false;
    }

    static randomIntFromInterval(min: number, max: number): number { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static getFormattedDate(date: any): string {
        let fmt;
        try{
            console.log("getFormattedDate", date);
            fmt = Intl.DateTimeFormat('pt-BR').format(new Date(date));
        }catch (e){
            fmt= date;
        }
        return fmt;
    };
}
