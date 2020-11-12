import HttpClient from "../../components/core/HttpClient";

export const paths = {
    responsaveis: (idUsuario: number) => `/${idUsuario}/responsaveis`,
    catequizandos: (idUsuario: number) => `/${idUsuario}/catequizandos`,
}

export const api ={
    usuarios: {
        root: () => '/usuarios',
        responsaveis: (idUsuario: number) => `/usuarios/${idUsuario}/responsaveis`,
        catequizandos: (idUsuario: number) => `/usuarios/${idUsuario}/catequizandos`,
    },
    responsaveis: {
        root: ()=> '/responsaveis',
        catequizandos: (idUsuario: number) => `/responsaveis/${idUsuario}/catequizandos`,
    }
}

export class UsuariosDispatcher extends HttpClient {

    constructor() {
        super('/usuarios');
    }

    findCatequizandosByIdUsuario(idUsuario: number) {
        return this.get(paths.catequizandos(idUsuario));
    }
}
