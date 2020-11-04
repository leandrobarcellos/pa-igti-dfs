import {CrudSequencialRepository} from "../../infra/crud-sequencial.repository";
import {Injectable} from "@nestjs/common";
import {User} from "./user";

@Injectable()
export class UserRepository extends CrudSequencialRepository<User> {

    constructor() {
        super('usuarios');
    }

}