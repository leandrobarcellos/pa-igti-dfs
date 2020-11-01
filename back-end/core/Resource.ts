import * as express from "express";
import {Request, Response, Router} from "express";
import {APIException} from "./exception/APIException";
import {HttpUtil} from "./util/HttpUtil";
import {Authorizer} from "./security/Authorizer";

export abstract class ExpressAction {
    public abstract execute(req: Request, res: Response): void;
}

export abstract class Resource {
    private readonly authorizer = new Authorizer();
    protected readonly path: string;
    private readonly _router: Router = express.Router();
    private allowed: string[];

    constructor(declaredPath: string, ...allowed: string[]) {
        this.path = declaredPath;
        this.allowed = allowed;
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {

    }

    protected addGET(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.get(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addPUT(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.put(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addPOST(callback: (req: Request, res: Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.post(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addDELETE(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.delete(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addPATCH(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.patch(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addSecuredGET(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.get(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addSecuredPUT(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.put(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addSecuredPOST(callback: (req: Request, res: Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.post(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addSecuredDELETE(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.delete(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected addSecuredPATCH(callback: (req: express.Request, res: express.Response) => void, uri?: string): void {
        uri = this.normalizeURI(uri);
        this._router.patch(`${this.path}${uri}`, this.secured(callback, ...this.allowed));
    }

    protected secured(callback: (req: Request, res: Response) => void, ...allowed: string[]): (req: Request, res: Response) => void {
        return (req: Request, res: Response) => {

            if (allowed && allowed.length > 0) {
                const token = this.authorizer.extractAuthorizationHeader(req);
                this.authorizer.jwtAuthorizer(authRes => {
                    console.log("authorized!", authRes);
                    callback(req, res);
                }, authRes => {
                    res.status(authRes.code).send(authRes.message);
                }, token, ...allowed);
            } else {
                callback(req, res);
            }
        }
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
