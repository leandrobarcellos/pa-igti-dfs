import {Get, Request} from '@nestjs/common';
import {Path} from "../../core/infra/app.decorators";
import {CatequizandoService} from "../catequizando/catequizando.service";
import {ResponsavelService} from "../responsavel/responsavel.service";

@Path('/usuarios')
export class UsuarioController {

    constructor(
        private readonly responsavelService: ResponsavelService,
        private readonly catequizandoService: CatequizandoService
    ) {
    }

    @Get('/:idUsuario/responsaveis')
    async getResponsaveisPorIdUsuario(@Request() req: any) {
        console.log("getResponsaveisPorIdUsuario", req.params);
        return this.responsavelService.findByIdUsuario(req.params.idUsuario);
    }

    @Get('/:idUsuario/catequizandos')
    async getCatequizandosPorIdUsuario(@Request() req: any) {
        console.log("getCatequizandosPorIdUsuario", req.params);
        return this.catequizandoService.findByIdUsuario(req.params.idUsuario as number);
    }
}
