import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user/user.service";

@Injectable()
export class SecurityService {
    constructor(
        private readonly usrService: UserService,
        private readonly jwtService: JwtService) {
    }

    async validateUser(usrName: string, pwd: string): Promise<any> {
        const user = this.usrService.findByUserName(usrName);
        if (user && user.password === pwd) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId, roles: user.roles};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
