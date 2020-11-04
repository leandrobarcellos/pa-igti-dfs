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

    public save(user: User): void {
        const validated = this.getValidatedUser(user);
        if (!validated.roles) {
            validated.roles = [Role.RESPONSAVEL];
        }
        this.userRepo.save(user);
    }

    public update(user: User): void {
        const validated = this.getValidatedUser(user);
        if (!validated.id)
            throw new NotFoundException("O usuário não existe.");
        this.userRepo.save(validated);
    }

    public remove(id: number): void {
        this.userRepo.delete(id);
    }

    private getValidatedUser(user: User): User {
        const {id, email, name, password, roles, gender} = user;
        this.validateUser(user);
        return {id, email, name, password, roles, gender};
    }

    private validateUser(user: User) {
        const errors = [];
        this.checkEmpty(user.name, errors, `Nome não informado.`);
        this.checkEmpty(user.password, errors, `Senha não informado.`);
        this.checkEmpty(user.gender, errors, `Sexo não informado.`);
        if (errors) {
            throw new BadRequestException(errors);
        }
    }

    private checkEmpty(value: unknown, errors: string[], msg: string) {
        if (!value) {
            errors.push(msg);
        }
    }

}
