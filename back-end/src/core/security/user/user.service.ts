import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {Role, User} from "./user";


@Injectable()
export class UserService {

    constructor(private readonly userRepo: UserRepository) {
    }

    public findByUserName(email: string): User {
        console.log("findByUserName", email);
        return this.userRepo.find(u => u.email === email);
    }

    public save(user: User): User {
        console.log('this.getValidatedUser(user)', user);
        const validated = this.getValidatedUser(user);
        if (!validated.roles || 0 === validated.roles.length) {
            validated.roles = [Role.RESPONSAVEL];
        }
        const byEmail = this.userRepo.findByEmail(user.email);
        if (byEmail && byEmail.id)
            throw new BadRequestException("E-mail já registrado.");
        this.userRepo.save(validated);
        return validated;
    }

    public saveCatequista(user: User): User {
        user.roles = [Role.CATEQUISTA];
        return this.save(user);
    }

    public saveAdmin(user: User): User {
        user.roles = [Role.ADMIN];
        return this.save(user);
    }

    public update(user: User): User {
        const validated = this.getValidatedUser(user);
        if (!validated.id)
            throw new NotFoundException("O usuário não existe.");
        this.userRepo.save(validated);
        return validated;
    }

    public remove(id: number): void {
        this.userRepo.delete(id);
    }

    private getValidatedUser(user: User): User {
        console.log("private getValidatedUser(user: User)", user);
        const {id, name, surname, email, password, roles, gender} = user;
        this.validateUser(user);
        return {id, name, surname, email, password, roles, gender};
    }

    private validateUser(user: User) {
        const errors = [];
        this.checkEmpty(user.name, errors, `Nome não informado.`);
        this.checkEmpty(user.surname, errors, `Sobrenome não informado.`);
        this.checkEmpty(user.email, errors, `E-mail não informado.`);
        this.checkEmpty(user.password, errors, `Senha não informada.`);
        // this.checkEmpty(user.gender, errors, `Sexo não informado.`);
        if (0 < errors.length) {
            throw new BadRequestException(errors);
        }
    }

    private checkEmpty(value: unknown, errors: string[], msg: string) {
        if (!value) {
            errors.push(msg);
        } else if (typeof value === 'string' && 0 === value.length) {
            errors.push(msg);
        }
    }

}
