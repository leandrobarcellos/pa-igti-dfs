
export interface Catequista {
    id?: number;
    idEtapa: number;
    nome: string,
    email: string,
    telefoneFixo?: string | undefined,
    telefoneCelular: string,
    endereco: string,
    casado: 'S' | 'N'
}