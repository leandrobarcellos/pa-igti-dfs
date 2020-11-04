import {Entity} from "../../infra/entity";

export const Role = {
    CATEQUISTA: "CATEQUISTA",
    ADMIN: "ADMIN",
    RESPONSAVEL: "RESPONSAVEL"
}

export interface User extends Entity<number>{
    email: string;
    name: string;
    password?: string;
    gender: 'M' | 'F';
    roles: string[]
}