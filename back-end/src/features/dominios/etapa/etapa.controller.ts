import {Controller, Get, Request} from '@nestjs/common';
import {CatequistaService} from "../../catequista/catequista.service";
import {EtapaService} from "./etapa.service";
import {Etapa} from "./etapa";
import {Catequista} from "../../catequista/catequista";

@Controller('e-catequese/etapas')
export class EtapaController {
    constructor(
        private readonly etapaService: EtapaService,
        private readonly catequistaService: CatequistaService) {
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

}
