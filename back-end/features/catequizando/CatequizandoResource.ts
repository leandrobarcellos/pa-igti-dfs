import * as express from 'express';
import {Util} from "../../core/util/Util";
import {Resource} from "../../core/Resource";
import {APIException} from "../../core/exception/APIException";
import {CatequizandoService} from "./CatequizandoService";
import {Catequizando} from "./Catequizando";

export class CatequistaResource extends Resource {

    private readonly service: CatequizandoService = new CatequizandoService();

    constructor() {
        super('/catequizandos');
    }

    protected intializeRoutes() {
        super.intializeRoutes();
        this.addGET((req, res) => this.getCatequizandos(req, res));
        this.addGET((req, res) => this.getCatequizando(req, res), "/:idCatequizando");
        this.addPOST((req, res) => this.createCatequizando(req, res));
        this.addPUT((req, res) => this.updateCatequizando(req, res), "/:idCatequizando");
        this.addDELETE((req, res) => this.deleteCatequizando(req, res), "/:idCatequizando");
    }

    private createCatequizando(request: express.Request, response: express.Response): void {
        try {
            const catequista: Catequizando = request.body;
            this.service.salvarCatequizando(catequista);
            this.doSendOk(response, catequista, "Catequizando incluído com sucesso.");
        } catch (e) {
            this.doSendError(response, e.status, e.message);
        }
    }

    private updateCatequizando(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            try {
                let catequizando: Catequizando = request.body;
                this.service.atualizarCatequizando(id, catequizando);
                this.doSendOkMessage(response, "Catequizando atualizado.");
            } catch (e) {
                this.doSendError(response, e.status, e.message);
            }
        })
    }

    private getCatequizandos(request: express.Request, response: express.Response): void {
        try {
            let findAll = this.service.findAll();
            this.doSendOk(response, findAll, "Resultado da consulta.");
        } catch (e) {
            this.doSendError(response, e.status, e.message);
        }
    }

    private deleteCatequizando(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            this.service.deleteCatequizando(id);
            this.doSendOkMessage(response, "Catequizando excluído com sucesso.");
        });
    }

    private getCatequizando(request: express.Request, response: express.Response): void {
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
