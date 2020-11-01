import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {SecurityService} from "../security.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly securityService: SecurityService) {
    super();
  }

  async validate(usrName: string, pwd: string): Promise<any> {
    const user = await this.securityService.validateUser(usrName, pwd);
    if (!user) {
      throw new UnauthorizedException("Ooops! Are you lost!?");
    }
    return user;
  }

}