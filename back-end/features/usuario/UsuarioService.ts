import {UsuarioRepository} from "./UsuarioRepository";
import {Usuario} from "./Usuario";

export class UsuarioService {

    private readonly repo: UsuarioRepository;

    constructor() {
        this.repo = new UsuarioRepository();
    }

    public salvar(usuario: Usuario): void {
        this.repo.save(usuario);
    }

    public consultarPorEmail(email: string): Usuario {
        return this.repo.consultarPorEmail(email);
    }
}