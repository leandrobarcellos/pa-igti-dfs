import {Injectable} from '@nestjs/common';

import {Catequista} from "./catequista";
import {CatequistaRepository} from "./catequista.repository";

@Injectable()
export class CatequistaService {
    private repo: CatequistaRepository;

    constructor() {
        this.repo = new CatequistaRepository();
    }

    public findById(accountId: number): Catequista {
        return this.repo.findById(accountId);
    }

    public findByIdEtapa(idEtapa: number): Catequista[] {
        return this.repo.findByIdEtapa(idEtapa);
    }

    public findAll(): Catequista[] {
        return this.repo.findAll();
    }

    salvarCatequista(catequista: Catequista): void {
        this.repo.save(catequista);
    }

    atualizarCatequista(catequista: Catequista) {
        this.repo.update(catequista);
    }

    deleteCatequista(catequistaId: number) {
        this.repo.delete(catequistaId);
    }

    public findByEmail(email: string): Catequista {
        return this.repo.findByEmail(email);
    }
}
