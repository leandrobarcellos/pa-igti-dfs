import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalGuard} from "../../core/security/guards/local.guard";
import {SecurityService} from "../../core/security/security.service";

@Controller()
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {
    }

    @Post('/e-catequese/login')
    @UseGuards(LocalGuard)
    async signIn(@Request() req: any): Promise<any | undefined> {
        return this.securityService.login(req.user);
    }

    @Post('/e-catequese/signup')
    async signUp(@Request() req: any): Promise<any | undefined> {
        console.log('async register: /new', req.body);
        return {ok: 'Hey, I can see you!', body: req.body};
    }
}
