export class APIException extends Error {
    readonly status: number;

    constructor(message: string, status?: number) {
        super(message);
        if (status) {
            this.status = status;
        } else {
            this.status = 500;
        }
    }

}