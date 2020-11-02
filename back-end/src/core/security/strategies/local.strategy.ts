import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {SecurityService} from "../security.service";
import {ApiException} from "../../exception/api.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly securityService: SecurityService) {
    super();
  }

  async validate(usrName: string, pwd: string): Promise<any> {
    const user = await this.securityService.validateUser(usrName, pwd);
    console.log(`async validate(${usrName}: string, ${pwd}: string)`, user);
    if (!user) {
      throw new ApiException("Ooops! Are you lost!?", 401);
    }
    return user;
  }

}