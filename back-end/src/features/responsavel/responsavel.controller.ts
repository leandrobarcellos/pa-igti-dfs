import {Controller, Delete, Get, Post, Put, Request} from '@nestjs/common';
import {ResponsavelService} from "./responsavel.service";
import {RolesAllowed} from "../../core/security/guards/roles-allowed.decorator";
import {Catequista} from "../catequista/catequista";
import {Responsavel} from "./responsavel";
import {Path} from "../../core/infra/app.decorators";

@Path('/responsaveis')
export class ResponsavelController {
    constructor(private readonly responsavelService: ResponsavelService) {
    }

    @Get()
    @RolesAllowed('ADMIN', 'CATEQUISTA')
    async getResponsaveis(@Request() req: any): Promise<any | undefined> {
        const responsaveis = this.responsavelService.findAll();
        return responsaveis;
    }

    @Get('/:idResponsavel')
    @RolesAllowed('ADMIN', 'CATEQUISTA')
    async getResponsavel(@Request() req: any): Promise<any | undefined> {
        return this.responsavelService.findById(req.params.idCatequista);
    }

    @Post()
    @RolesAllowed('ADMIN', 'CATEQUISTA')
    async createResponsavel(@Request() req: any): Promise<any | undefined> {
        const responsavel: Responsavel = req.body;
        this.responsavelService.salvar(responsavel);
        return {message: "Responsável incluído com sucesso."};
    }

    @Put('/:idResponsavel')
    @RolesAllowed('ADMIN', 'CATEQUISTA', 'RESPONSAVEL')
    async updateResponsavel(@Request() req: any): Promise<any | undefined> {
        const responsavel: Responsavel = req.body;
        this.responsavelService.atualizar(responsavel);
        return {message: "Responsavel atualizado com sucesso."};
    }

    @Delete('/:idResponsavel')
    @RolesAllowed('ADMIN')
    async deleteCatequista(@Request() req: any): Promise<any | undefined> {
        this.responsavelService.excluir(req.params.idResponsavel);
        return {message: "Catequista excluído com sucesso."};
    }

}
