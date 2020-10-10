import * as express from "express";
import {Response, Router} from "express";
import {Util} from "./util/Util";
import {APIException} from "./exception/APIException";
import {HttpUtil} from "./util/HttpUtil";

export abstract class Resource {
    protected readonly path: string;
    private readonly _router: Router = express.Router();

    constructor(declaredPath: string) {
        this.path = declaredPath;
        this.intializeRoutes();
    }

    protected intializeRoutes(): void {

    }

    protected addGET(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.get(`${this.path}${uri}`, callback);
    }

    protected addPUT(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.put(`${this.path}${uri}`, callback);
    }

    protected addPOST(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.post(`${this.path}${uri}`, callback);
    }

    protected addDELETE(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.delete(`${this.path}${uri}`, callback);
    }

    protected addPATCH(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.patch(`${this.path}${uri}`, callback);
    }

    private normalizeURI(uri: string | undefined) {
        if (!uri) {
            uri = "";
        }
        return uri;
    }

    get router(): Router {
        return this._router;
    }

    protected doSendOk(response: Response, object: any, message: string) {
        HttpUtil.doSendOk(response, object, message);
    };

    protected doSendOkMessage(response: Response, message: string) {
        HttpUtil.doSendMessage(response, 200, message);
    };

    protected doSendError(response: Response, error: number, message: string) {
        HttpUtil.doSendError(response, error, message);
    };

    protected operateById<K>(req: express.Request, res: express.Response,
                           operate: (id: K) => void): void {
        let id: K | null = this.extractIdFromPath<K>(req, res);
        if (undefined === id || null === id) {
            throw new APIException("Não encontrado.", 404);
        } else {
            operate(id);
        }
    }

    private extractIdFromPath<K>(request: express.Request, response: express.Response): K | null {
        let id: K | null = null;
        try {
            id = this.extractId(request);
        } catch (e) {
            this.doSendError(response, e.status, e.message);
        }
        return id;
    }

    protected abstract extractId(request: express.Request): any;
}
