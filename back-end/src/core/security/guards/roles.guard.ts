import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';
import {jwtConstants} from '../constants';
import {Reflector} from '@nestjs/core';

/**
 * Guard customizado para realizar a segurança das rotas levando em conta os papéis do usuário na aplicação.
 *
 */
@Injectable()
export class RolesGuard implements CanActivate {

    private readonly jwtService = new JwtService({
        secret: jwtConstants.secret,
    });

    /**
     * O parâmetro reflector possibilita a obtenção de valores declarados no decorator @SetMetadata(...)
     *
     * @see roles-allowed.decorator.ts
     * @param reflector
     */
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const authorization = this.extractAuthorizationHeader(context);
        this.verifyAuthorizationToken(authorization);
        const roles = this.extractRoles(context);
        if (!roles) {
            return true;
        }
        this.checkRoles(authorization, roles);
        return true;
    }

    private checkRoles(authorization: string, roles: string[]) {
        let role = undefined;
        const decoded: any = this.jwtService.decode(authorization);
        const userRoles: string[] = decoded.roles as string[];
        if (userRoles) {
            role = userRoles.find(r => roles.includes(r));
        }
        if (!role) {
            throw new UnauthorizedException('Unauthorized.');
        }
    }

    private verifyAuthorizationToken(authorization: string) {
        try {
            this.jwtService.verify(authorization);
        } catch (e) {
            console.warn('JWT Error', e);
            throw new UnauthorizedException(e.message);
        }
    }

    /**
     * Extrai o token - codificado em base64 - do cabeçalho Authorization.
     *
     * @param context
     * @private
     */
    private extractAuthorizationHeader(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        let authorization = request.get('Authorization');
        if (authorization) {
            if (authorization.toLowerCase().includes('bearer')) {
                authorization = authorization.trim().substr('bearer'.length).trim();
            }
            authorization = authorization.trim();
        }
        return authorization;
    }

    /**
     * Extrai os papéis de usuário permitidos que foram declarados no decorator @RolesAllowed
     * @param context
     * @private
     */
    private extractRoles(context: ExecutionContext): string[] {
        return this.reflector.get<string[]>('roles', context.getHandler());
    }
}