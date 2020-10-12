import {Resource} from "../../core/Resource";
import {CatequistaService} from "../catequista/CatequistaService";
import {Request, Response} from "express";
import {Responsavel} from "../responsavel/Responsavel";
import {ResponsavelService} from "../responsavel/ResponsavelService";

export class SubscricaoResource extends Resource {

    private readonly catequisttaService: CatequistaService = new CatequistaService();
    private readonly responsavelService: ResponsavelService = new ResponsavelService();

    constructor() {
        super('/subscricao');
    }

    protected extractId(request: Request): any {
    }

    protected initializeRoutes() {
        this.addPOST((req: Request, res: Response) => this.novoRegistro(req, res));
    }

    private novoRegistro(request: Request, response: Response): void {
        this.responsavelService.salvar(request.body as Responsavel);
    }


}