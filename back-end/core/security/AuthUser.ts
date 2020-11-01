export const Role = {
    CATEQUISTA: "CATEQUISTA",
    ADMIN: "ADMIN",
    RESPONSAVEL: "RESPONSAVEL"
}

export interface AppToken {
    nome: string,
    email: string,
    existe: boolean,
    dateCreated: Date,
    expiresIn: number
    roles: string[]
}

export interface AuthUser {
    nome: string,
    email: string,
    token: string
}

export interface AuthResponse {
    code: 200 | 400 | 401 | 404 | 500,
    message?: string
}