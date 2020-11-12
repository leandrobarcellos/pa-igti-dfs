import {Module} from '@nestjs/common';
import {SecurityController} from './security/security.controller';
import {CatequistaController} from './catequista/catequista.controller';
import {CatequizandoController} from './catequizando/catequizando.controller';
import {TurmaController} from './turma/turma.controller';
import {ResponsavelController} from './responsavel/responsavel.controller';
import {CatequistaService} from './catequista/catequista.service';
import {ResponsavelService} from "./responsavel/responsavel.service";
import {CatequizandoService} from "./catequizando/catequizando.service";
import {TurmaService} from "./turma/turma.service";
import {EtapaService} from "./dominios/etapa/etapa.service";
import {EtapaController} from "./dominios/etapa/etapa.controller";
import {CoreModule} from "../core/core.module";
import {EncontroCatequeseController} from './encontro-catequese/encontro-catequese.controller';
import {FrequenciaCatequizandoController} from './frequencia-catequizando/frequencia-catequizando.controller';
import {UsuarioController} from './usuario/usuario.controller';

@Module({
    controllers: [
        SecurityController,
        CatequistaController,
        CatequizandoController,
        TurmaController,
        ResponsavelController,
        EtapaController,
        EncontroCatequeseController,
        FrequenciaCatequizandoController,
        UsuarioController
    ],
    providers: [
        CatequistaService,
        ResponsavelService,
        CatequizandoService,
        TurmaService,
        EtapaService,
    ],
    imports: [
        CoreModule,
    ]
})
export class FeaturesModule {
}
