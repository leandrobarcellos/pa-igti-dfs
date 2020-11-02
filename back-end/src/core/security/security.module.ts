import {Module} from '@nestjs/common';
import {SecurityService} from './security.service';
import {UserService} from './user/user.service';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from "./constants";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {UserRepository} from "./user/user.repository";

@Module({
    providers: [
        SecurityService,
        UserService,
        UserRepository,
        LocalStrategy,
        JwtStrategy
    ],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '86400s'},
        }),
    ],
    exports: [
        SecurityService,
        UserService
    ]
})
export class SecurityModule {
}
