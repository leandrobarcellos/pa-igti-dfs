import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {SecurityService} from "../security.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly securityService: SecurityService) {
    super();
  }

  async validate(email: string, pwd: string): Promise<any> {
    const user = await this.securityService.validateUser(email, pwd);
    console.log(`async validate(${email}: string, ${pwd}: string)`, user);
    if (!user) {
      throw new UnauthorizedException("Ooops! Are you lost!?");
    }
    return user;
  }

}
