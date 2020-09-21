import * as express from 'express';
import {Catequista} from "./Catequista";
import {CatequistaService} from "./CatequistaService";
import {Util} from "../../core/util/Util";
import {Resource} from "../../core/Resource";
import {APIException} from "../../core/exception/APIException";

export class CatequistaResource extends Resource {

    private readonly service: CatequistaService = new CatequistaService();

    constructor() {
        super('/catequistas');
    }

    protected intializeRoutes() {
        super.intializeRoutes();
        this.addGET((req, res) => this.getCatequistas(req, res));
        this.addGET((req, res) => this.getCatequista(req, res), "/:idCatequista");
        this.addPOST((req, res) => this.createCatequista(req, res));
        this.addPUT((req, res) => this.updateCatequista(req, res), "/:idCatequista");
        this.addDELETE((req, res) => this.deleteCatequista(req, res), "/:idCatequista");
    }

    private createCatequista(request: express.Request, response: express.Response): void {
        try {
            const catequista: Catequista = request.body;
            this.service.salvarCatequista(catequista);
            this.doSendOk(response, catequista, "Catequista incluído com sucesso.");
        } catch (e) {
            this.doSendError(response, e.status, e.message);
        }
    }

    private updateCatequista(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            try {
                this.service.makeDeposit(id, Number(request.body.depositAmmount));
                this.doSendOkMessage(response, "Catequista atualizado.");
            } catch (e) {
                this.doSendError(response, e.status, e.message);
            }
        })
    }

    private getCatequistas(request: express.Request, response: express.Response): void {
        try {
            let findAll = this.service.findAll();
            this.doSendOk(response, findAll, "Resultado da consulta.");
        } catch (e) {
            this.doSendError(response, e.status, e.message);
        }
    }

    private deleteCatequista(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (accountId: number) => {
            this.service.deleteAccount(accountId);
            this.doSendOkMessage(response, "Catequista excluído com sucesso.");
        });
    }

    private getCatequista(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            try {
                this.doSendOk(response, this.service.findById(id), "Consulta realizada com sucesso.");
            } catch (e) {
                this.doSendError(response, e.status, e.message);
            }
        });
    }

    protected extractId(request: express.Request): number {
        let idCatequista = request.params.idCatequista;
        if (Util.isUndefinedOrNaN(idCatequista)) {
            throw new APIException("Não encontrado.", 404);
        }
        return Number(idCatequista);
    }

}
