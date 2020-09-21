export class Util {

    public static isUndefinedOrNaN(toCheck: any): boolean {
        let num = Number(toCheck);
        return toCheck === undefined || Number.isNaN(num);
    }

    public static isNaN(toCheck: any): boolean {
        let num = Number(toCheck);
        return Number.isNaN(num);
    }

    static isUndefinedOrNull(id: any) {
        return undefined == id || null == id;
    }
}