
export interface Responsavel{
    id?: number,
    nome: string,
    endereco: string,
    cep: string,
    telefoneFixo: string,
    telefoneMovel: string,
    email: string,
    religiao: string,
    praticante: 'S' | 'N'
}
