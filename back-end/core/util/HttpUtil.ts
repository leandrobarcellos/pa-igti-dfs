import {Response} from "express";
import {Util} from "./Util";

export class HttpUtil {
    public static doSendOk(response: Response, object: any, message: string) {
        this.doSend(response, 200, message, object);
    };

    public static doSendOkMessage(response: Response, message: string) {
        this.doSendMessage(response, 200, message);
    };

    public static doSendMessage(response: Response, status: number, message: string) {
        this.doSend(response, status, message)
    };

    public static doSend(response: Response, status: number, message?: string,  object?: any) {
        response.header({"Content-type": "application/json"});
        response.status(status).send({
            "object": object,
            "message": message
        });
    };

    public static doSendError(response: Response, errorStatus: number, message: string) {
        let status = 500;
        if (!Util.isNaN(errorStatus) && 99 < errorStatus && 600 > errorStatus) {
            status = errorStatus;
        }
        this.doSendMessage(response, status, message);
    };

}