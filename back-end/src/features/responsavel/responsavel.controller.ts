import {Controller, Delete, Get, Post, Put, Request} from '@nestjs/common';
import {ResponsavelService} from "./responsavel.service";
import {Roles} from "../../core/security/guards/roles.decorator";
import {Catequista} from "../catequista/catequista";
import {Responsavel} from "./responsavel";

@Controller('e-catequese/responsaveis')
export class ResponsavelController {
    constructor(private readonly responsavelService: ResponsavelService) {
    }

    @Get()
    @Roles('ADMIN', 'CATEQUISTA')
    async getResponsaveis(@Request() req: any): Promise<any | undefined> {
        const responsaveis = this.responsavelService.findAll();
        return responsaveis;
    }

    @Get('/:idResponsavel')
    @Roles('ADMIN', 'CATEQUISTA')
    async getResponsavel(@Request() req: any): Promise<any | undefined> {
        return this.responsavelService.findById(req.params.idCatequista);
    }

    @Post()
    @Roles('ADMIN', 'CATEQUISTA')
    async createResponsavel(@Request() req: any): Promise<any | undefined> {
        const responsavel: Responsavel = req.body;
        this.responsavelService.salvar(responsavel);
        return {message: "Responsável incluído com sucesso."};
    }

    @Put('/:idResponsavel')
    @Roles('ADMIN', 'CATEQUISTA', 'RESPONSAVEL')
    async updateResponsavel(@Request() req: any): Promise<any | undefined> {
        const responsavel: Responsavel = req.body;
        this.responsavelService.atualizar(responsavel);
        return {message: "Responsavel atualizado com sucesso."};
    }

    @Delete('/:idResponsavel')
    @Roles('ADMIN')
    async deleteCatequista(@Request() req: any): Promise<any | undefined> {
        this.responsavelService.excluir(req.params.idResponsavel);
        return {message: "Catequista excluído com sucesso."};
    }

}
