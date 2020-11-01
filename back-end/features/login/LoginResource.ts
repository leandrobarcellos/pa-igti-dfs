import {Resource} from "../../core/Resource";
import {CatequistaService} from "../catequista/CatequistaService";
import {Request, Response} from "express";
import {ResponsavelService} from "../responsavel/ResponsavelService";
import {UsuarioService} from "../usuario/UsuarioService";
import {Role} from "../../core/security/AuthUser";
import {APIException} from "../../core/exception/APIException";

export class LoginResource extends Resource {

    private readonly catequistaService: CatequistaService = new CatequistaService();
    private readonly responsavelService: ResponsavelService = new ResponsavelService();
    private readonly usuarioService: UsuarioService = new UsuarioService();

    constructor() {
        super('/login');
    }

    protected initializeRoutes() {
        this.addPOST(this.buscarPorEmail());
    }

    protected extractId(request: Request): any {

    }

    private buscarPorEmail(): (req: Request, res: Response) => void {
        return (req: Request, res: Response) => {
            let found = true;
            let email = req.body.email;
            console.log("buscarPorEmail", email);

            try{
                const usuario = this.usuarioService.consultarPorEmail(email);
                this.doSendOk(res, usuario, "Catequista encontrado.");
            }catch (e){
                found = false;
            }
            try {
                let catequista = this.catequistaService.findByEmail(email);
                this.doSendOk(res, catequista, "Catequista encontrado.");
            } catch (e) {
                found = false;
            }
            try {
                if (!found) {
                    let responsavel = this.responsavelService.findByEmail(email);
                    this.doSendOk(res, responsavel, "Responsável encontrado.");
                }
            } catch (e) {
                found = false;
            }
            console.log("buscarPorEmail", found);
            if(!found) {
                throw new APIException("Not allowed action.", 405);
            }
        }
    }
}