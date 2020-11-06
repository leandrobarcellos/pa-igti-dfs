import {Injectable} from "@nestjs/common";
import {User} from "./user";
import {CrudRepository} from "../../infra/crud.repository";

@Injectable()
export class UserRepository extends CrudRepository<number, User> {

    constructor() {
        super('usuarios');
    }

    findByEmail(email: string): User {
        return this.find(u => u.email === email);
    }
}
