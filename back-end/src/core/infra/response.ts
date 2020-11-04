export class Response {
    private readonly status: number;
    private object: any;
    private message: string | string[];

    constructor(status: number) {
        this.status = status;
    }

    static status(status: number): Response {
        return new Response(status);
    }

    public withObject(object: any): Response {
        this.object = object;
        return this;
    }

    public withMessage(message: string | string[]): Response {
        this.message = message;
        return this;
    }

}
