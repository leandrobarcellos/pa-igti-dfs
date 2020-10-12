import * as express from 'express';
import {TurmaService} from "./TurmaService";
import {Util} from "../../core/util/Util";
import {Resource} from "../../core/Resource";
import {APIException} from "../../core/exception/APIException";
import {Turma} from "./Turma";
import {CatequizandoService} from "../catequizando/CatequizandoService";

export class TurmaResource extends Resource {

    private readonly service: TurmaService = new TurmaService();
    private readonly catequizandoService: CatequizandoService = new CatequizandoService();

    constructor() {
        super('/turmas');
    }

    protected initializeRoutes() {
        this.addGET((req, res) => this.getTurmas(req, res));
        this.addGET((req, res) => this.getCatequizandosPorTurma(req, res),
            "/:idTurma/catequizandos");
        this.addGET((req, res) => this.getTurma(req, res), "/:idTurma");
        this.addPOST((req, res) => this.createTurma(req, res));
        this.addPUT((req, res) => this.updateTurma(req, res), "/:idTurma");
        this.addDELETE((req, res) => this.deleteTurma(req, res), "/:idTurma");
    }

    private createTurma(request: express.Request, response: express.Response): void {
        const turma: Turma = request.body;
        this.service.incluir(turma);
        this.doSendOk(response, turma, "Catequista incluído com sucesso.");
    }

    private updateTurma(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            this.service.alterar(request.body);
            this.doSendOkMessage(response, "Turma atualizada.");
        })
    }

    private getTurmas(request: express.Request, response: express.Response): void {
        this.doSendOk(response, this.service.find(), "Resultado da consulta.");
    }

    private deleteTurma(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            this.service.excluir(id);
            this.doSendOkMessage(response, "Turma excluída com sucesso.");
        });
    }

    private getTurma(request: express.Request, response: express.Response): void {
        this.operateById<number>(request, response, (id: number) => {
            this.doSendOk(response, this.service.find(id), "Consulta realizada com sucesso.");
        });
    }

    protected extractId(request: express.Request): number {
        let idTurma = request.params.idTurma;
        if (Util.isUndefinedOrNaN(idTurma)) {
            throw new APIException("Não encontrado.", 404);
        }
        return Number(idTurma);
    }

    private getCatequizandosPorTurma(req: express.Request, res: express.Response) {
        this.operateById<number>(req, res, (id: number) => {
            let catequizandos = this.catequizandoService.consultarCatequizandosPorIdTurma(id);
            if (catequizandos.length == 0) {
                throw new APIException("Não encontrado.", 404);
            }
            this.doSendOk(res, catequizandos, "Busca realizada por sucesso.");
        });
    }
}
