import {Injectable} from '@nestjs/common';
import {UserRepository} from "./user.repository";

export type User = any;

@Injectable()
export class UserService {

    constructor(private readonly userRepo: UserRepository) {
    }

    public findByUserName(usrName: string): User {
        return this.userRepo.find(u => u.username.includes(usrName));
    }
}
