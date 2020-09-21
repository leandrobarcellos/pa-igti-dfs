import {Catequista} from "./Catequista";
import {CatequistaRepository} from "./CatequistaRepository";

export class CatequistaService {

    private repo: CatequistaRepository;

    constructor() {
        this.repo = new CatequistaRepository();
    }


    public findById(accountId: number): Catequista {
        return this.repo.findById(accountId);
    }

    public findAll(): Catequista[] {
        return this.repo.findAll();
    }
}