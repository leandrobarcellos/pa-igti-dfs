import {Get, Request} from '@nestjs/common';
import {CatequistaService} from "../../catequista/catequista.service";
import {EtapaService} from "./etapa.service";
import {Etapa} from "./etapa";
import {Catequista} from "../../catequista/catequista";
import {Path} from "../../../core/infra/app.decorators";
import {CatequizandoService} from "../../catequizando/catequizando.service";
import {Catequizando} from "../../catequizando/catequizando";

@Path('/etapas')
export class EtapaController {
    constructor(
        private readonly etapaService: EtapaService,
        private readonly catequistaService: CatequistaService,
        private catequizandoService: CatequizandoService) {
    }

    @Get()
    async getTodasEtapas(@Request() req: any): Promise<Etapa[] | undefined> {
        return this.etapaService.findAll();
    }

    @Get('/:idEtapa')
    async getEtapa(@Request() req: any): Promise<Etapa | undefined> {
        return this.etapaService.findById(req.params.idEtapa);
    }

    @Get('/:idEtapa/catequistas')
    async getCatequistasByIdEtapa(@Request() req: any): Promise<Catequista[] | undefined> {
        return this.catequistaService.findByIdEtapa(req.params.idEtapa);
    }

    @Get('/:idEtapa/catequizandos')
    async getCatequizandoByIdEtapa(@Request() req: any): Promise<Catequizando[] | undefined> {
        return this.catequizandoService.findByIdEtapa(req.params.idEtapa);
    }

}
