import * as express from "express";
import {Request, response, Response} from "express";
import {Resource} from "../../Resource";
import {Util} from "../../util/Util";
import {APIException} from "../../exception/APIException";
import {EtapaService} from "./EtapaService";
import {CatequistaService} from "../../../features/catequista/CatequistaService";


export class EtapaResource extends Resource {
    private readonly MSG_SUCESSO_CONSULTA = "Consulta realizada com sucesso.";
    private readonly service: EtapaService;
    private readonly catequistaService: CatequistaService;

    constructor() {
        super("/etapas");
        this.service = new EtapaService();
        this.catequistaService = new CatequistaService();
    }

    protected initializeRoutes() {
        this.addGET((req, res) => this.getTodasEtapas(req, res));
        this.addGET((req, res) => this.getEtapa(req, res), "/:idEtapa");
        this.addGET((req, res) => this.getCatequistasByIdEtapa(req, res),
            "/:idEtapa/catequistas");
    }


    protected extractId(request: express.Request): number {
        let idEtapa = request.params.idEtapa;
        if (Util.isUndefinedOrNaN(idEtapa)) {
            throw new APIException("Não encontrado.", 404);
        }
        return Number(idEtapa);
    }

    private getTodasEtapas(req: express.Request, res: express.Response) {
        try {
            let object = this.service.findAll();
            this.doSendOk(res, object, this.MSG_SUCESSO_CONSULTA);
        } catch (e) {
            this.doSendError(res, e.status, e.message);
        }
    }

    private getEtapa(req: express.Request, res: express.Response) {
        this.operateById<number>(req, res, id => {
            try {
                this.doSendOk(res, this.service.findById(id), this.MSG_SUCESSO_CONSULTA);
            } catch (e) {
                this.doSendError(res, e.status, e.message);
            }
        });
    }

    private getCatequistasByIdEtapa(req: Request, res: Response) {
        let idEtapa = req.params.idEtapa;
        if (!Util.isUndefinedOrNaN(idEtapa)) {
            this.doSendOk(res, this.catequistaService.findByIdEtapa(Number(idEtapa)), "Catequistas encontrados.");
        } else {
            this.doSendError(res, 404, "Catequistas não encontrados.");
        }
    }
}