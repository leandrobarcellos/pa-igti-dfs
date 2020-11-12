import {Delete, Get, Post, Put, Request} from '@nestjs/common';
import {TurmaService} from "./turma.service";
import {Turma} from "./turma";
import {Catequizando} from "../catequizando/catequizando";
import {CatequizandoService} from "../catequizando/catequizando.service";
import {Path} from "../../core/infra/app.decorators";

@Path('/turmas')
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService,
        private readonly catequizandoService: CatequizandoService
    ) {
    }

    @Get()
    async getTurmas(@Request() req: any): Promise<Turma[] | undefined> {
        return this.turmaService.findAll();
    }

    @Get('/:idTurma/catequizando')
    async getCatequizandosPorTurma(@Request() req: any): Promise<Catequizando[] | undefined> {
        return this.catequizandoService.consultarCatequizandosPorIdTurma(req.params.idTurma);
    }

    @Get('/:idTurma')
    async getTurma(@Request() req: any): Promise<Turma | undefined> {
        return this.turmaService.findById(req.params.idTurma);
    }

    @Post()
    async createTurma(@Request() req: any): Promise<Turma | undefined> {
        console.log("async createTurma", req.body);
        this.turmaService.incluir(req.body as Turma);
        return null;
    }

    @Put('/:idTurma')
    async updateTurma(@Request() req: any): Promise<Turma | undefined> {
        return null;
    }

    @Delete('/:idTurma')
    async deleteTurma(@Request() req: any): Promise<Turma | undefined> {
        this.turmaService.excluir(req.params.idTurma);
        return null;
    }
}
