import {Controller, Delete, Get, Post, Put, Request, UseGuards} from '@nestjs/common';
import {CatequistaService} from "./catequista.service";
import {Catequista} from "./catequista";
import {RolesGuard} from "../../core/security/guards/roles.guard";
import {Roles} from "../../core/security/guards/roles.decorator";

@UseGuards(RolesGuard)
@Controller('e-catequese/catequista')
export class CatequistaController {

    constructor(private readonly catequistaService: CatequistaService) {
    }

    @Get()
    async getCatequistas(@Request() req: any): Promise<any | undefined> {
        return this.catequistaService.findAll();
    }

    @Get('/:idCatequista')
    @Roles('ADMIN', 'CATEQUISTA')
    async getCatequista(@Request() req: any): Promise<any | undefined> {
        console.log("req.params.idCatequista", req.params.idCatequista);
        return this.catequistaService.findById(req.params.idCatequista);
    }

    @Post()
    @Roles('ADMIN')
    async createCatequista(@Request() req: any): Promise<any | undefined> {
        const catequista: Catequista = req.body;
        console.log(req.body);
        this.catequistaService.salvarCatequista(catequista);
        return {message: "Catequista incluído com sucesso."};
    }

    @Put('/:idCatequista')
    @Roles('ADMIN')
    async updateCatequista(@Request() req: any): Promise<any | undefined> {
        console.log("updateCatequista.req", req);
        console.log("req.idCatequista", req.params.idCatequista);
        const catequista: Catequista = req.body;
        this.catequistaService.atualizarCatequista(catequista);
        return {message: "Catequista atualizado com sucesso."};
    }

    @Delete('/:idCatequista')
    @Roles('ADMIN')
    async deleteCatequista(@Request() req: any): Promise<any | undefined> {
        const catequista: Catequista = req.body;
        this.catequistaService.deleteCatequista(req.params.idCatequista);
        return {message: "Catequista excluído com sucesso."};
    }
}
