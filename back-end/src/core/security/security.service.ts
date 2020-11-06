import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user/user.service";
import {User} from "./user/user";

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

    async login(user: User) {
        console.log("async login(user: User)", user);
        const payload = {name: user.name, sub: user.id, roles: user.roles, surname: user.surname, email: user.email};
        const {password, gender, ...result} = user;
        return {
            access_token: this.jwtService.sign(payload),
            user: result
        };
    }
}
