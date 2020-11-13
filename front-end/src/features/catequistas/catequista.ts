
export interface Catequista {
    id?: number;
    idEtapa: number;
    nome: string,
    email: string,
    telefoneFixo?: string | undefined,
    telefoneMovel: string,
    endereco: string,
    casado: 'S' | 'N'
}
