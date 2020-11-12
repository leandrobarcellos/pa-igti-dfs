import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalGuard} from "../../core/security/guards/local.guard";
import {SecurityService} from "../../core/security/security.service";
import {UserService} from "../../core/security/user/user.service";
import {User} from "../../core/security/user/user";
import {Path} from "../../core/infra/app.decorators";

@Path()
export class SecurityController {

    constructor(
        private readonly securityService: SecurityService,
        private readonly userService: UserService
    ) {
    }

    @Post('/login')
    @UseGuards(LocalGuard)
    async signIn(@Request() req: any): Promise<any | undefined> {
        return this.securityService.login(req.user);
    }

    @Post('/signup')
    async signUp(@Request() req: any): Promise<any | undefined> {
        try {
            const usr = req.body;
            const toDB =
                {
                    email: usr.email,
                    name: usr.nome,
                    password: usr.senha,
                    surname: usr.sobrenome
                } as User;
            console.log("this.userService.save(toDB);", toDB);
            const user = this.userService.save(toDB);
            console.log("this.userService.save passed!");
            return this.securityService.login(user);
        }catch (e) {
            console.log("}catch (e) { "+JSON.stringify(e));
            throw e;
        }
    }
}
