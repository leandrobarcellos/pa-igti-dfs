import {Controller} from '@nestjs/common';
import {ResponsavelService} from "./responsavel.service";

@Controller('e-catequese/responsaveis')
export class ResponsavelController {
    constructor(private readonly responsavelService: ResponsavelService) {
    }
}
