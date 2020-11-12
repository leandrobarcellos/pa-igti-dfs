import {Get, Request} from '@nestjs/common';
import {ResponsavelRepository} from "../responsavel/responsavel.repository";
import {Path} from "../../core/infra/app.decorators";
import {CatequizandoRepository} from "../catequizando/catequizando.repository";

@Path('/usuarios')
export class UsuarioController {
    private readonly responsavelRepo: ResponsavelRepository;
    private readonly catequizandoRepo: CatequizandoRepository;

    constructor() {
        this.responsavelRepo = new ResponsavelRepository();
        this.catequizandoRepo = new CatequizandoRepository();
    }

    @Get('/:idUsuario/responsaveis')
    async getResponsaveisPorIdUsuario(@Request() req: any) {
        console.log("getResponsaveisPorIdUsuario", req.params);
        return this.responsavelRepo.findByIdUsuario(req.params.idUsuario);
    }

    @Get('/:idUsuario/catequizandos')
    async getCatequizandosPorIdUsuario(@Request() req: any) {
        console.log("getCatequizandosPorIdUsuario", req.params);
        const responsaveis = this.responsavelRepo.findByIdUsuario(req.params.idUsuario);
        const idsResponsaveis = responsaveis.map(r=> Number(r.id));
        console.log("idsResponsaveis", idsResponsaveis);
        return this.catequizandoRepo.findByIdsResponsaveis(idsResponsaveis);
    }
}
