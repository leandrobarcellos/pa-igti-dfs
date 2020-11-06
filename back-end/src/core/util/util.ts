export class Util {

    public static isUndefinedOrNaN(toCheck: any): boolean {
        const num = Number(toCheck);
        return toCheck === undefined || Number.isNaN(num);
    }

    public static isNaN(toCheck: any): boolean {
        const num = Number(toCheck);
        return Number.isNaN(num);
    }

    static isUndefinedOrNull(id: any) {
        return undefined == id || null == id;
    }

    static isTelefoneOk(value: string, size: number): boolean {
        return (!value || size < value.length);
    }
}
