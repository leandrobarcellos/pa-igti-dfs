import {Resource} from "../../core/Resource";
import {CatequistaService} from "../catequista/CatequistaService";
import {Request, Response} from "express";
import {ResponsavelService} from "../responsavel/ResponsavelService";

export class LoginResource extends Resource {

    private readonly catequistaService: CatequistaService = new CatequistaService();
    private readonly responsavelService: ResponsavelService = new ResponsavelService();

    constructor() {
        super('/login');
    }

    protected initializeRoutes() {
        this.addPOST((req: Request, res: Response) => this.buscarPorEmail(req, res));
    }

    protected extractId(request: Request): any {

    }

    private buscarPorEmail(req: Request, res: Response): void {
        let found = true;
        let email = req.body.email;
        try {
            let catequista = this.catequistaService.findByEmail(email);
            this.doSendOk(res, catequista, "Catequista encontrado.");
        } catch (e) {
            found = false;
        }
        if (!found) {
            let responsavel = this.responsavelService.findByEmail(email);
            this.doSendOk(res, responsavel, "Responsável encontrado.");
        }
    }
}