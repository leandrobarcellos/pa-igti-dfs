import {HttpException} from "@nestjs/common";

export class ApiException extends HttpException {

    constructor(message: string, status?: number | 500) {
        super(message, status);
    }

}