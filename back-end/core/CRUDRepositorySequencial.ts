import {Entity} from "./Entity";
import {CRUDRepository} from "./CRUDRepository";

export abstract class CRUDRepositorySequencial<T extends Entity<number>> extends CRUDRepository<number, T> {

    constructor(dbName: string) {
        super(dbName);
    }

    protected configurarNovoIdSequencial(entity: T, newId: number) {
        entity.id = newId;
    }
}