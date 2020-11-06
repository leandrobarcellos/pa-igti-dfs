import {Module} from '@nestjs/common';
import {SecurityController} from './security/security.controller';
import {CatequistaController} from './catequista/catequista.controller';
import {CatequizandoController} from './catequizando/catequizando.controller';
import {TurmaController} from './turma/turma.controller';
import {ResponsavelController} from './responsavel/responsavel.controller';
import {CatequistaService} from './catequista/catequista.service';
import {SecurityModule} from "../core/security/security.module";
import {ResponsavelService} from "./responsavel/responsavel.service";
import {CatequizandoService} from "./catequizando/catequizando.service";
import {TurmaService} from "./turma/turma.service";
import {TurmaCatequizandoService} from "./turma/turma-catequizando.service";
import {EtapaService} from "./dominios/etapa/etapa.service";
import {EtapaController} from "./dominios/etapa/etapa.controller";
import {CoreModule} from "../core/core.module";
import { TurmaCatequizandoController } from './turma-catequizando/turma-catequizando.controller';
import { EncontroCatequeseController } from './encontro-catequese/encontro-catequese.controller';
import { FrequenciaCatequizandoController } from './frequencia-catequizando/frequencia-catequizando.controller';

@Module({
    controllers: [
        SecurityController,
        CatequistaController,
        CatequizandoController,
        TurmaController,
        ResponsavelController,
        EtapaController,
        TurmaCatequizandoController,
        EncontroCatequeseController,
        FrequenciaCatequizandoController
    ],
    providers: [
        CatequistaService,
        ResponsavelService,
        CatequizandoService,
        TurmaService,
        TurmaCatequizandoService,
        EtapaService,
    ],
    imports: [
        CoreModule,
    ]
})
export class FeaturesModule {
}
