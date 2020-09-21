import {CRUDRepository} from "../../core/CRUDRepository";
import {Usuario} from "./Usuario";
import {APIException} from "../../core/exception/APIException";

export class UsuarioRepository extends CRUDRepository<Usuario> {
    constructor() {
        super("usuarios");
    }

    public consultarPorEmail(email: string): Usuario {
        let find: any = this.db.rows.find((u: Usuario) => u.email === email);
        if (!find)
            throw new APIException("Não encontrado.", 404);
        return find;
    }
}