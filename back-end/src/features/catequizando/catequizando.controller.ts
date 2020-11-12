import {Delete, Get, Post, Put, Request} from '@nestjs/common';
import {Catequizando} from "./catequizando";
import {CatequizandoService} from "./catequizando.service";
import {Path} from "../../core/infra/app.decorators";

@Path('/catequizandos')
export class CatequizandoController {

    constructor(private readonly catequizandoService: CatequizandoService) {
    }

    @Get()
    async getCatequizandos(@Request() req: any): Promise<Catequizando[] | undefined> {
        return this.catequizandoService.findAll();
    }

    @Get('/:idCatequizando')
    async getCatequizando(@Request() req: any): Promise<Catequizando | undefined> {
        return this.catequizandoService.findById(req.params.idCatequizando);
    }

    @Post()
    async createCatequizando(@Request() req: any): Promise<Catequizando | undefined> {
        return this.catequizandoService.salvarCatequizando(req.body as Catequizando);
    }

    @Put('/:idCatequizando')
    async updateCatequizando(@Request() req: any): Promise<Catequizando | undefined> {
        return null;
    }

    @Delete('/:idCatequizando')
    async deleteCatequizando(@Request() req: any): Promise<Catequizando | undefined> {
        return null;
    }

}
